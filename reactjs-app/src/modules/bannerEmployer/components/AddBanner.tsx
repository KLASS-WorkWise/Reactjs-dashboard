import { Modal, Form, Input, Button, DatePicker, Select, Upload, message } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

import type { UploadRequestOption } from "rc-upload/lib/interface";
import { createBanner, uploadBannerImage } from "../banneremployer.service";
import { useAuthStore } from '../../../stores/useAuthorStore';

interface AddBannerProps {
  visible: boolean;
  onClose: () => void;
  userId: number;
}

export default function AddBanner({ visible, onClose, userId }: AddBannerProps) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (options: UploadRequestOption) => {
    const { file: uploadFile, onSuccess, onError } = options;
    try {
      // Lưu file gốc vào state để gửi khi tạo banner
      setFile(uploadFile as File);
      // Nếu muốn preview, có thể tạo url tạm
      const url = URL.createObjectURL(uploadFile as File);
      setImageUrl(url);
      message.success("Chọn ảnh thành công!");
      if (onSuccess) onSuccess(url, {} as any);
    } catch (err) {
      message.error("Chọn ảnh thất bại!");
      if (onError) onError(err as any);
    }
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("companyName", values.companyName);
      formData.append("companyEmail", values.companyEmail);
      formData.append("companyPhone", values.companyPhone);
      formData.append("companyWebsite", values.companyWebsite || "");
      formData.append("bannerTitle", values.bannerTitle);
      formData.append("bannerLink", values.bannerLink);
      formData.append("bannerType", values.bannerType);
      formData.append("startDate", values.dateRange[0].format("YYYY-MM-DD"));
      formData.append("endDate", values.dateRange[1].format("YYYY-MM-DD"));
      formData.append("description", values.description || "");
      if (file) formData.append("bannerImage", file);
  // Lấy access_token từ store bằng import chuẩn
  const { access_token } = useAuthStore.getState();
  await createBanner(formData, access_token);
      message.success("Tạo banner thành công!");
      onClose();
      form.resetFields();
      setImageUrl("");
      setFile(null);
    } catch {
      message.error("Tạo banner thất bại!");
    }
    setLoading(false);
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null} title="Tạo banner mới" width={600}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="companyName" label="Tên công ty" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name="companyEmail" label="Email công ty" rules={[{ required: true, type: "email" }]}><Input /></Form.Item>
        <Form.Item name="companyPhone" label="Số điện thoại công ty" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name="companyWebsite" label="Website công ty"><Input /></Form.Item>
        <Form.Item name="bannerTitle" label="Tiêu đề banner" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name="bannerType" label="Vị trí" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Vip">Vip</Select.Option>
              <Select.Option value="Featured">Featured</Select.Option>
              <Select.Option value="Standard">Standard</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item name="bannerLink" label="Link banner" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name="dateRange" label="Thời gian thuê" rules={[{ required: true }]}><RangePicker showTime /></Form.Item>
        <Form.Item label="Ảnh banner/logo">
          <Upload name="file" customRequest={handleUpload} showUploadList={false} accept="image/*">
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          {imageUrl && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, color: '#555' }}>Preview ảnh đã chọn:</div>
              <img src={imageUrl} alt="banner preview" style={{ marginTop: 4, maxWidth: "100%", maxHeight: 120, borderRadius: 6 }} />
            </div>
          )}
        </Form.Item>
        <Form.Item style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading} block>Tạo banner</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}