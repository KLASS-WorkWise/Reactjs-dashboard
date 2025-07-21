# các chức năng chính

## Dashboard

### 🧩 User Story #1: Dashboard hiển thị tổng quan

User Story: As an admin, I want to see an overview of jobs, users, and applications,  
So that I can monitor platform performance efficiently.

Acceptance Criteria:

- Hiển thị tổng số công việc đang tuyển, ứng viên đăng ký, đơn ứng tuyển
- Biểu đồ hiển thị số lượng ứng tuyển theo ngày/tháng
- Thống kê theo ngành nghề phổ biến nhất
- Dashboard tải nhanh và không bị lỗi hiển thị

Priority: High  
Story Points: 5  
UI Design: DashboardOverview.fig  

---

### 🧩 User Story #2: Quản lý danh sách công việc

User Story: As an admin, I want to view, edit, and delete job postings,  
So that I can manage job listings effectively.

Acceptance Criteria:

- Hiển thị danh sách công việc: tên, công ty, ngành, hạn nộp
- Có nút sửa và xoá công việc
- Sửa thông tin công việc sẽ hiển thị modal hoặc trang riêng
- Xoá sẽ yêu cầu xác nhận (confirmation dialog)

Priority: High  
Story Points: 5  
UI Design: JobListAdmin.fig  

---

### 🧩 User Story #3: Duyệt đơn ứng tuyển

User Story: As an employer, I want to review applications for my job posts,  
So that I can select the best candidates.

Acceptance Criteria:

- Hiển thị danh sách ứng viên theo từng công việc
- Có thể xem chi tiết hồ sơ ứng viên (CV, thông tin)
- Có nút chấp nhận / từ chối ứng viên
- Thông báo sẽ được gửi qua email nếu bị từ chối / chấp nhận

Priority: Medium  
Story Points: 4  
UI Design: ApplicationReview.fig  

---

### 🧩 User Story #4: Bộ lọc và tìm kiếm trong Dashboard

User Story: As an admin, I want to filter and search job listings and applications,  
So that I can quickly find what I need.

Acceptance Criteria:

- Có ô tìm kiếm theo tên công việc / ứng viên
- Có bộ lọc theo ngành nghề, ngày tạo, tình trạng
- Kết quả cập nhật ngay khi người dùng chọn (debounce optional)
- Trường hợp không tìm thấy thì hiển thị thông báo phù hợp

Priority: Medium  
Story Points: 3  
UI Design: FilterSearchAdmin.fig  

