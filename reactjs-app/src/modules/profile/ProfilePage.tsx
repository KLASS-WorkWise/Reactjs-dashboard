import { Card, Typography, Avatar, Spin, Form, Input, Button, message } from "antd";
import { useAuthStore } from "../../stores/useAuthorStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile } from "./profile.service";
import { updateUser } from "../user/user.service";
import { UserOutlined, MailOutlined, DollarCircleOutlined } from "@ant-design/icons";

const ProfilePage: React.FC = () => {
  const userId = useAuthStore((state) => state.loggedInUser?.id);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { data, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const res = await fetchProfile(userId!);
      // Nếu API trả về { data: {...} }
      const profile = res.data ? res.data : res;
      // Ép kiểu balance về number nếu là string
      return {
        ...profile,
        balance: profile.balance ? Number(profile.balance) : 0,
      };
    },
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      message.success("Cập nhật thông tin thành công!");
      queryClient.invalidateQueries(["profile", userId]);
    },
    onError: () => {
      message.error("Cập nhật thất bại!");
    }
  });

  if (isLoading || !data) {
    return <Spin style={{ display: "block", margin: "100px auto" }} />;
  }

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <Card style={{ maxWidth: 420, width: "100%", borderRadius: 18, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} bodyStyle={{ padding: 36 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Avatar size={64} icon={<UserOutlined />} style={{ background: "#1890ff" }} />
          <Typography.Title level={4} style={{ marginTop: 12, marginBottom: 0 }}>
            Thông tin cá nhân
          </Typography.Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            username: data.username,
            fullName: data.fullName,
            email: data.email,
          }}
          onFinish={(values) => {
            mutation.mutate({ ...data, ...values });
          }}
        >
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "Nhập username!" }]}> 
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="fullName" label="Họ tên" rules={[{ required: true, message: "Nhập họ tên!" }]}> 
            <Input placeholder="Họ tên" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Nhập email hợp lệ!" }]}> 
            <Input placeholder="Email"  />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={mutation.isLoading} style={{ fontWeight: 600, borderRadius: 10 }}>
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <DollarCircleOutlined style={{ marginRight: 8, color: "#52c41a" }} />
          <Typography.Text>
            Số dư: <b>{typeof data.balance === "number" ? data.balance.toLocaleString() : 0} VNĐ</b>
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
