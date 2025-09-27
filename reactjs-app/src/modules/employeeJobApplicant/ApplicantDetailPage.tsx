import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applicantService } from "../../services/applicant.service";
import type { ApplicantHistory, ApplicantTracking } from "../../types/employerJobAplicant.type";
import styles from "../../styles/ApplicantDetailPage.module.css";

export const ApplicationStatus = {
  CV_REVIEW: "CV_REVIEW",
  INTERVIEW: "INTERVIEW",
  OFFER: "OFFER",
  HIRED: "HIRED",
  REJECTED: "REJECTED",
} as const;

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export default function ApplicantDetailPage() {
  const { applicantId } = useParams<{ applicantId: string }>();
  const [tracking, setTracking] = useState<ApplicantTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDetail = async () => {
    if (!applicantId) return;
    setLoading(true);
    try {
      const res = await applicantService.getEmployeeTracking(Number(applicantId));
      setTracking(res);
    } catch (err) {
      console.error("❌ Lỗi load applicant detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [applicantId]);

  if (loading) return <p>Đang tải chi tiết ứng viên...</p>;
  if (!tracking || !tracking.detail) return <p>Không tìm thấy ứng viên.</p>;

  const applicant = tracking.detail;
  const history: ApplicantHistory[] = tracking.history || [];
  const currentStatus = applicant.applicationStatus;

  return (
    <div className={styles.applicantContainer}>
      <button className={styles.applicantBack} onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <div className={styles.applicantDetailGrid}>
        {/* Left Column: Applicant + Job Info */}
        <div className={styles.applicantLeft}>
          <div className={styles.applicantHeader}>
            <h1 className={styles.applicantTitle}>{applicant.fullName}</h1>
            <p className={styles.applicantInfo}><strong>Job:</strong> {applicant.jobTitle}</p>
            <p className={styles.applicantInfo}> <strong>Company:</strong> {applicant.companyName}</p>
        
            <p className={styles.applicantInfo}>{applicant.location_company}</p>
         

            <p className={styles.applicantInfo}>
              <strong>Trạng thái hiện tại:</strong>
              <span className={`${styles.applicantStatus} ${styles[`status${currentStatus}`]}`}>
                {currentStatus}
              </span>
            </p>
            <p className={styles.applicantInfo}><strong>Skill match:</strong> {applicant.skillMatchPercent}%</p>
    
            <p className={styles.applicantInfo}><strong>Min experience required:</strong> {applicant.minExperience}</p>
            <p className={styles.applicantInfo}><strong>Skill qualified:</strong> {applicant.isSkillQualified ? "✅" : "❌"}</p>
            <p className={styles.applicantInfo}><strong>Experience qualified:</strong> {applicant.isExperienceQualified ? "✅" : "❌"}</p>
            <p className={styles.applicantInfo}><strong>Missing skills:</strong> {applicant.missingSkills.join(", ") || "None"}</p>

            <p className={styles.applicantInfo}><strong>Resume:</strong> <a href={applicant.resumeLink} target="_blank" rel="noopener noreferrer">Link</a></p>
            <p className={styles.applicantInfo}><strong>Cover letter:</strong>  {applicant.coverLetter || "None"}</p>
            <p className={styles.applicantInfo}><strong>Applied at:</strong> {new Date(applicant.appliedAt).toLocaleString()}</p>
            {/* <p className={styles.applicantInfo}><strong>Job description:</strong> {applicant.description}</p> */}
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className={styles.applicantRight}>
          <div className={styles.timeline}>
            <h2>📌 Timeline ứng tuyển</h2>
            {history.length === 0 ? (
              <p className={styles.applicantInfo}>Chưa có lịch sử.</p>
            ) : (
          <ul className={styles.timelineList}>
  {history.map((h, index) => {
    let itemClass = styles.timelineItemPending;

    if (h.status === currentStatus) {
      itemClass = styles.timelineItemCurrent;
    } else {
      const currentIndex = history.findIndex(item => item.status === currentStatus);
      if (index < currentIndex) itemClass = styles.timelineItemCompleted;
    }

    return (
      <li key={h.id} className={`${styles.timelineItem} ${itemClass}`}>
        <div className={styles.timelineItemCircle}>
          {itemClass === styles.timelineItemCompleted ? "✓" : index + 1}
        </div>
        <p className={`${styles.timelineStatus}`}>{h.status}</p>
        {h.note && <p className={styles.timelineNote}>{h.note}</p>}
        <p className={styles.timelineMeta}>
          {new Date(h.changedAt).toLocaleString()} - {h.changedBy}
        </p>
      </li>
    );
  })}
</ul>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}
