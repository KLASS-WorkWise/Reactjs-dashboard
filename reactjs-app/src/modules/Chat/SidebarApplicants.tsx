
import React, { useEffect, useState, useRef } from "react";
import { collection, query, where, onSnapshot, doc, setDoc } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "./libraries/firebase/initializaApp";
import { fetchProfile } from "../profile/profile.service";

interface Applicant {
  id: string;
  applicantId: string;
  applicantName?: string;
}

interface SidebarApplicantsProps {
  employerId: string;
  // now pass both id and optional name so the ChatPage/ChatBox can show the name immediately
  onSelectApplicant: (applicant: { applicantId: string; applicantName?: string }) => void;
}

const SidebarApplicants: React.FC<SidebarApplicantsProps> = ({ employerId, onSelectApplicant }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  // cache fetched applicant names to avoid repeated backend calls
  const nameCache = useRef<Record<string, string>>({});
  const fetching = useRef<Record<string, boolean>>({});

  useEffect(() => {
    // Firestore may store employerId as number or string. Query both possible representations using 'in' when helpful.
    // Luôn query cả số và chuỗi để đảm bảo lấy được dữ liệu bất kể kiểu lưu trong Firestore
    const asString = String(employerId);
    const asNumber = !isNaN(Number(employerId)) ? Number(employerId) : null;
    let q;
    if (asNumber !== null && asString !== String(asNumber)) {
      q = query(collection(db, "chats"), where("employerId", "in", [asNumber, asString]));
    } else if (asNumber !== null) {
      q = query(collection(db, "chats"), where("employerId", "in", [asNumber, asString]));
    } else {
      q = query(collection(db, "chats"), where("employerId", "==", asString));
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, data: d.data() }));
      console.log('[DEBUG SidebarApplicants] snapshot docs:', JSON.stringify(docs, null, 2));
      const list: Applicant[] = snapshot.docs.map((doc: DocumentData) => ({
        id: doc.id,
        applicantId: String(doc.data().applicantId),
        applicantName: doc.data().applicantName,
      }));
      setApplicants(list);
      setLoading(false);

      // for any entry missing applicantName, try to fetch from backend profile
      const missing = list.filter(a => !a.applicantName).map(a => a.applicantId);
      if (missing.length > 0) {
        // only fetch for ids not in cache
        const toFetch = missing.filter(id => !nameCache.current[id]);
        if (toFetch.length > 0) {
          Promise.all(toFetch.map(id => {
            // try numeric id when possible
            const param = /^\d+$/.test(id) ? Number(id) : id;
            return fetchProfile(param).catch((err) => { console.error('[SidebarApplicants] fetchProfile failed for', id, err); return null; });
          })).then(results => {
            const updates: Record<string, string> = {};
            results.forEach((res, idx) => {
              const id = toFetch[idx];
              console.debug('[SidebarApplicants] fetchProfile result for', id, res);
              if (res && (res.data || res.fullName || res.fullname || res.name || res.username || res.email)) {
                // support different response shapes (axios or fetch)
                const payload = res.data ? res.data : res;
                const name = payload.fullName || payload.fullname || payload.name || payload.username || payload.email;
                nameCache.current[id] = name;
                updates[id] = name;
                // persist the discovered applicantName back to Firestore summary doc
                try {
                  const chatId = `${employerId}_${id}`; // use original employerId prop to construct chatId
                  console.debug('[SidebarApplicants] persisting applicantName', { chatId, name });
                  setDoc(doc(db, 'chats', chatId), { applicantName: name }, { merge: true }).catch(err => console.error('setDoc failed for chat summary', chatId, err));
                } catch (err) {
                  console.error('setDoc exception', id, err);
                }
              }
            });
            if (Object.keys(updates).length > 0) {
              setApplicants(prev => prev.map(p => ({ ...p, applicantName: p.applicantName ?? updates[p.applicantId] ?? p.applicantName })));
            }
          }).catch((e) => { console.error('Error resolving applicant names', e); });
        }
      }
    });
    return () => unsubscribe();
  }, [employerId]);

  // ensure individual missing names are fetched (in case batch missed or new items arrive)
  useEffect(() => {
    if (applicants.length === 0) return;
    const parsed = Number(employerId);
    const valueToQuery = !isNaN(parsed) ? parsed : employerId;
    applicants.forEach(app => {
      const id = app.applicantId;
      if (app.applicantName) return; // already have name
      if (nameCache.current[id]) {
        // fill from cache
        setApplicants(prev => prev.map(p => p.applicantId === id ? { ...p, applicantName: nameCache.current[id] } : p));
        return;
      }
      if (fetching.current[id]) return; // already fetching
      fetching.current[id] = true;
      fetchProfile(id).then(res => {
        if (res && (res.fullName || res.fullname || res.name || res.username || res.email)) {
          const name = res.fullName || res.fullname || res.name || res.username || res.email;
          nameCache.current[id] = name;
          setApplicants(prev => prev.map(p => p.applicantId === id ? { ...p, applicantName: name } : p));
          // persist to Firestore chat summary so future loads have it
          const chatId = `${valueToQuery}_${id}`;
          setDoc(doc(db, 'chats', chatId), { applicantName: name }, { merge: true }).catch(err => console.error('setDoc failed for chat summary', chatId, err));
        }
      }).catch(err => {
        console.error('fetchProfile failed for', id, err);
      }).finally(() => {
        fetching.current[id] = false;
      });
    });
  }, [applicants, employerId]);

  if (loading) return <div>Đang tải...</div>;
  if (applicants.length === 0) return <div>Chưa có tin nhắn nào nhắn tới bạn</div>;

  return (
    <div>
      {applicants.map(applicant => (
        <div key={applicant.id} onClick={() => onSelectApplicant({ applicantId: applicant.applicantId, applicantName: applicant.applicantName })} style={{cursor: "pointer", padding: 8, borderBottom: "1px solid #eee"}}>
          Ứng viên: {applicant.applicantName || applicant.applicantId}
        </div>
      ))}
    </div>
  );
};

export default SidebarApplicants;
