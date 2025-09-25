import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applicantService } from "../../services/applicant.service";
import type { ApplicantResponse } from "../../types/employerJobAplicant.type";
import styles from "../../styles/JobApplicantsPage.module.css"; // đổi import

export const ApplicationStatus = {
  CV_REVIEW: "CV_REVIEW",
  INTERVIEW: "INTERVIEW",
  OFFER: "OFFER",
  HIRED: "HIRED",
  REJECTED: "REJECTED",
} as const;

export type ApplicationStatus =
  typeof ApplicationStatus[keyof typeof ApplicationStatus];

function ApplicantRow({
  applicant,
  onUpdate,
  onDetail,
}: {
  applicant: ApplicantResponse;
  onUpdate: (id: number, status: ApplicationStatus, note: string) => void;
  onDetail: (id: number) => void;
}) {
  const [status, setStatus] = useState<ApplicationStatus | "">(
    applicant.applicationStatus as ApplicationStatus
  );
  const [note, setNote] = useState("");

  return (
    <tr>
      <td>{applicant.fullName}</td>
      <td>{applicant.coverLetter}</td>
      <td>
        <a
          href={applicant.resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cvLink}
        >
          Xem CV
        </a>
      </td>
      <td>{applicant.applicationStatus}</td>
      <td>
        <div className={styles.updateForm}>
          <select
            className={styles.statusSelect}
            value={status}
            onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
          >
            <option value="">-- Select Status --</option>
            {Object.values(ApplicationStatus).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Notes for candidates..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={styles.noteInput}
          />
          <button
            className={styles.saveBtn}
            onClick={() => onUpdate(applicant.id, status as ApplicationStatus, note)}
          >
            💾 Lưu
          </button>
        </div>
      </td>
      <td>
        <button
          onClick={() => onDetail(applicant.id)}
          className={styles.detailBtn}
        >
          Chi tiết
        </button>
      </td>
    </tr>
  );
}

export default function JobApplicantsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [applicants, setApplicants] = useState<ApplicantResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchApplicants = async () => {
    if (!jobId) return;
    setLoading(true);
    try {
      const res = await applicantService.getApplicantsByJob(Number(jobId));
      setApplicants(res.data);
      console.log("✅ applicants:", res.data);
    } catch (err) {
      console.error("❌ Lỗi load applicants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const handleUpdateStatus = async (
    applicantId: number,
    status: ApplicationStatus,
    note: string
  ) => {
    if (!status) {
      alert("⚠️ Vui lòng chọn trạng thái");
      return;
    }
    try {
      await applicantService.updateApplicantStatus(applicantId, status, note);
      await fetchApplicants();
      alert("✅ Cập nhật trạng thái thành công");
    } catch (err) {
      console.error("❌ Lỗi update status:", err);
      alert("❌ Không thể cập nhật trạng thái");
    }
  };

  return (
    <div className={styles.jobApplicants}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className={styles.pageTitle}>Danh sách ứng viên cho Job #{jobId}</h1>

      {loading ? (
        <p>Đang tải danh sách ứng viên...</p>
      ) : applicants.length === 0 ? (
        <p>Chưa có ứng viên nào.</p>
      ) : (
        <table className={styles.applicantsTable}>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Cover Letter</th>
              <th>Resume</th>
              <th>Status</th>
              <th className="w-64">Update</th>
              <th className="w-32">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((a) => (
              <ApplicantRow
                key={a.id}
                applicant={a}
                onUpdate={handleUpdateStatus}
                onDetail={(id) => navigate(`/employerjob/applicants/${id}`)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
