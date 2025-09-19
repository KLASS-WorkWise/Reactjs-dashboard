# Blog Module

Module quản lý blog với các tính năng:

## Tính năng đã implement

### 1. Preview ảnh khi chọn file

- ✅ Hiển thị preview ảnh ngay khi người dùng chọn file
- ✅ Hỗ trợ chuyển đổi ảnh thành base64
- ✅ Giới hạn kích thước file 2MB
- ✅ Chỉ chấp nhận file ảnh

### 2. Tạo blog mới

- ✅ Form validation đầy đủ
- ✅ Upload và preview ảnh
- ✅ Chọn danh mục
- ✅ Xử lý lỗi chi tiết

### 3. Sửa blog

- ✅ Hiển thị form với dữ liệu hiện tại
- ✅ Giữ nguyên ảnh cũ nếu không chọn ảnh mới
- ✅ Cập nhật thông tin blog

## Cách sử dụng

### Tạo blog mới

1. Click nút "Thêm blog mới"
2. Điền đầy đủ thông tin:
   - Tiêu đề (tối thiểu 5 ký tự)
   - Slug (chỉ chữ thường, số và dấu gạch ngang)
   - Danh mục
   - Tóm tắt (tối thiểu 10 ký tự)
   - Nội dung (tối thiểu 20 ký tự)
   - Hình ảnh (bắt buộc, tối đa 2MB)
3. Click "Tạo mới"

### Sửa blog

1. Click nút "Sửa" trên blog cần chỉnh sửa
2. Form sẽ hiển thị với dữ liệu hiện tại
3. Chỉnh sửa thông tin cần thiết
4. Ảnh cũ sẽ được giữ nguyên nếu không chọn ảnh mới
5. Click "Cập nhật"

## Cấu trúc file

```
blog/
├── blog.router.tsx     # Định nghĩa route
├── blogPage.tsx        # Trang chính quản lý blog
├── blogTable.tsx       # Bảng hiển thị danh sách blog
├── blogForm.tsx        # Form tạo/sửa blog
├── blog.service.ts     # API calls
├── blog.type.ts        # Type definitions
└── README.md          # Hướng dẫn sử dụng
```

## API Endpoints

- `GET /api/blogs` - Lấy danh sách blog
- `GET /api/blogs/:id` - Lấy blog theo ID
- `POST /api/blogs/:categoryId` - Tạo blog mới
- `PUT /api/blogs/:id` - Cập nhật blog
- `DELETE /api/blogs/:id` - Xóa blog
- `GET /api/categories` - Lấy danh sách danh mục

## Lưu ý

- Ảnh được chuyển đổi thành base64 và lưu trực tiếp trong database
- Form validation được thực hiện ở cả client và server
- Hỗ trợ debug với console.log để theo dõi quá trình xử lý
- Modal sử dụng `destroyOnClose` để reset form khi đóng
