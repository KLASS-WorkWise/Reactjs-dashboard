import React, { useEffect, useState } from "react";
import type { DocumentData, Timestamp } from "firebase/firestore";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "./libraries/firebase/initializaApp";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp?: Timestamp | null;
}

interface ChatBoxProps {
  chatId: string;
  currentUserId: string;
  initialApplicantName?: string | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId, currentUserId, initialApplicantName = null }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [applicantName, setApplicantName] = useState<string | null>(null);
  const [maybeApplicantId, setMaybeApplicantId] = useState<string | null>(null);

  // if parent provides an initial applicant name (from sidebar), use it immediately
  // we'll prefer the prop over the summary snapshot when rendering

  useEffect(() => {
    if (!chatId) return;
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Message[] = snapshot.docs.map((doc: DocumentData) => ({
        id: doc.id,
        senderId: doc.data().senderId,
        text: doc.data().text,
        timestamp: doc.data().timestamp,
      }));
      setMessages(list);
    });
    return () => unsubscribe();
  }, [chatId, initialApplicantName]);

  // subscribe to chat summary document to get applicant's display name
  useEffect(() => {
    if (!chatId) return;
    const summaryRef = doc(db, "chats", chatId);
    const unsubscribe = onSnapshot(summaryRef, (snap) => {
      const data = snap.data() as DocumentData | undefined;
      console.debug('[ChatBox] summary snapshot', { chatId, data, initialApplicantName });
      if (data) {
        // prefer the summary value but keep initial prop if set
        setApplicantName(data.applicantName ?? initialApplicantName ?? null);
        setMaybeApplicantId(data.applicantId ?? null);
      } else {
        // fallback: try to infer from chatId pattern
        const parts = chatId.split("_");
        setMaybeApplicantId(parts[1] ?? null);
        setApplicantName(initialApplicantName ?? null);
      }
    });
    return () => unsubscribe();
  }, [chatId, initialApplicantName]);

  // sync when parent-provided initial name changes
  useEffect(() => {
    if (initialApplicantName) setApplicantName(initialApplicantName);
  }, [initialApplicantName]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: currentUserId,
      text: input,
      timestamp: serverTimestamp(),
    });
    // ensure the chat summary exists and is updated
    // parse employerId/applicantId from chatId if chatId was generated as `${employer}_${applicant}`
    const parts = chatId.split("_");
    const maybeEmployerId = parts[0] ?? null;
    const maybeApplicantId = parts[1] ?? null;
    await setDoc(doc(db, "chats", chatId), {
      employerId: maybeEmployerId ? String(maybeEmployerId) : "",
      applicantId: maybeApplicantId ? String(maybeApplicantId) : "",
      applicantName: applicantName || String(maybeApplicantId),
      lastMessage: input,
      lastTimestamp: serverTimestamp(),
    }, { merge: true });
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: 8, borderBottom: "1px solid #eee" }}>
        <strong>Ứng viên: </strong>
        {applicantName || maybeApplicantId || "(Không rõ)"}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ textAlign: msg.senderId === currentUserId ? "right" : "left", margin: "4px 0" }}>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
              {msg.senderId === currentUserId ? "Bạn" : (applicantName || maybeApplicantId || msg.senderId)}
            </div>
            <span style={{ background: msg.senderId === currentUserId ? "#e0f7fa" : "#fff", padding: "6px 12px", borderRadius: 8, display: "inline-block" }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", padding: 8, borderTop: "1px solid #eee" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={sendMessage} style={{ marginLeft: 8, padding: "8px 16px" }}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
