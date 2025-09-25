import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { applicantService } from "../../services/applicant.service";
import { jobService } from "../../services/job.service";
import type { JobPosting } from "../../types/employerJobAplicant.type";
import styles from "../../styles/EmployerJobsPage.module.css";
import { FiPlus, FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await applicantService.getMyJobs();
  setJobs(Array.isArray(res.data) ? res.data : []);
        console.log("xem đây là lỗi gì", res.data);
      } catch (err) {
        console.error("❌ Lỗi load jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa job này không?")) return;
    try {
      await jobService.deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
      alert("✅ Xóa thành công!");
    } catch (err) {
      console.error("❌ Lỗi xóa job:", err);
      alert("❌ Không thể xóa job");
    }
  };

  return (
    <div className={styles.container}>
      {/* Header với nút tạo job */}
      <div className={styles.header}>
        <h1>Danh sách Job đã đăng</h1>
        <button
          className={styles.createBtn}
          onClick={() => navigate("/employerjob/jobs/create")}
        >
          <FiPlus /> Tạo Job mới
        </button>
      </div>

      {loading ? (
        <p className={styles.loading}>Đang tải danh sách job...</p>
      ) : jobs.length === 0 ? (
        <p className={styles.empty}>Chưa có job nào.</p>
      ) : (
        <div className={styles.jobsGrid}>
          {jobs.map(job => (
            <div key={job.id} className={styles.jobCard}>
              {/* Header card */}
              <h2 className={styles.jobTitle}>{job.title}</h2>
              <div className={styles.jobInfoRow}>
                <span><strong>Location:</strong> {job.location}</span>
                <span><strong>Salary:</strong> {job.salaryRange}</span>
              </div>
              {/* <div  className={styles.jobInfoRow}>        Description :     
              <p className={styles.jobDescription}>
                {job.description}
              </p>
              </div> */}


              {/* Skills */}
              <div className={styles.skillsContainer}>
                {job.requiredSkills.map((skill, idx) => (
                  <span key={idx} className={styles.skillBadge}>{skill}</span>
                ))}
              </div>

              {/* Info bổ sung */}
              <div className={styles.infoRow}>
                <span><strong>Min Experience:</strong> {job.minExperience} years</span>
                <span><strong>End At:</strong> {new Date(job.endAt).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/employerjob/jobs/${job.id}/edit`)}
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(job.id)}
                >
                  <FiTrash2 /> Delete
                </button>
                <button
                  className={styles.viewBtn}
                  onClick={() => navigate(`/employerjob/jobs/${job.id}/applicants`)}
                >
                  <FiUsers /> View Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
