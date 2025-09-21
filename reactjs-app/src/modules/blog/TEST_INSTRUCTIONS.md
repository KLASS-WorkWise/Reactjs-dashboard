# Hướng dẫn test Blog Module

## Cách test preview ảnh:

### 1. Mở ứng dụng

```bash
cd reactjs-app
npm run dev
```

### 2. Test tạo blog mới

1. Vào trang Blog Management
2. Click "Thêm blog mới"
3. **Chọn ảnh** - Bạn sẽ thấy:
   - Ảnh hiển thị ngay trong Upload component (picture-card style)
   - Thông tin file hiển thị bên dưới
   - Console log hiển thị quá trình upload

### 3. Test sửa blog

1. Click "Sửa" trên blog bất kỳ
2. Form sẽ hiển thị với dữ liệu hiện tại
3. Ảnh cũ sẽ hiển thị trong Upload component
4. Có thể chọn ảnh mới hoặc giữ nguyên

## Debug Console

Mở Developer Tools (F12) và xem Console để theo dõi:

- "Upload started: [file object]"
- "File validation passed, converting to base64..."
- "Base64 conversion completed, length: [number]"
- "Setting fileList: [array]"

## Nếu vẫn không thấy preview:

1. Kiểm tra Console có lỗi gì không
2. Đảm bảo file ảnh < 2MB
3. Đảm bảo file là định dạng ảnh (jpg, png, gif, etc.)
4. Kiểm tra network tab xem có request nào bị lỗi không

## Tính năng đã sửa:

- ✅ Preview ảnh hiển thị ngay trong Upload component
- ✅ Thông tin file hiển thị bên dưới
- ✅ Debug logs để theo dõi quá trình
- ✅ Validation file ảnh và kích thước
- ✅ Xử lý lỗi chi tiết



