import { useState, useEffect } from "react";
import { Card, Table, Button, Tag, Typography, Space, message, Modal, Input } from "antd";
import { fetchBannerAdmins, approveBannerAdmin, rejectBannerAdmin } from "./banneradmin.service";
import type { BannerAdminType } from "./banneradmin.type";
import BannerAdminDelete from "./components/BannerAdminDelete";

const BannerAdminPage = () => {
  const [banners, setBanners] = useState<BannerAdminType[]>([]);
  const [loading, setLoading] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchBannerAdmins();
      setBanners(data);
    } catch {
      message.error("Không lấy được danh sách banner!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await approveBannerAdmin(id);
      message.success("Duyệt banner thành công!");
      fetchData();
    } catch {
      message.error("Duyệt banner thất bại!");
    }
  };

  const handleReject = async () => {
    if (!rejectId) return;
    try {
      await rejectBannerAdmin(rejectId, rejectReason);
      message.success("Từ chối banner thành công!");
      setRejectModal(false);
      setRejectReason("");
      setRejectId(null);
      fetchData();
    } catch {
      message.error("Từ chối banner thất bại!");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Company", dataIndex: "companyName", key: "companyName" },
    { title: "Tiêu đề", dataIndex: "bannerTitle", key: "bannerTitle" },
    { title: "Vị trí", dataIndex: "position", key: "position" },
    { title: "Ngày bắt đầu", dataIndex: "startDate", key: "startDate" },
    { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate" },
    { title: "Trạng thái", dataIndex: "status", key: "status", render: (status: string) => {
      if (status === "ACTIVE") return <Tag color="green">ACTIVE</Tag>;
      if (status === "REJECTED") return <Tag color="red">REJECTED</Tag>;
      return <Tag color="orange">PENDING</Tag>;
    }},
    { title: "Ảnh", dataIndex: "bannerImage", key: "bannerImage", render: (url: string) => url ? (
      <img
        src={url.startsWith("/uploads/") ? `http://localhost:8080${url}` : url}
        alt="banner"
        style={{ width: 80, borderRadius: 6, cursor: "pointer" }}
        onClick={() => {
          setPreviewImage(url.startsWith("/uploads/") ? `http://localhost:8080${url}` : url);
          setPreviewVisible(true);
        }}
      />
    ) : null },
    { title: "Link", dataIndex: "bannerLink", key: "bannerLink", render: (url: string) => url ? <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> : null },
    { title: "Action", key: "action", render: (_: any, record: BannerAdminType) => (
      <Space>
        <Button size="small" type="primary" onClick={() => handleApprove(record.id)}>Duyệt</Button>
        <Button size="small" danger onClick={() => { setRejectId(record.id); setRejectModal(true); }}>Từ chối</Button>
        <BannerAdminDelete id={record.id} onDeleted={fetchData} />
      </Space>
    )}
  ];

  return (
    <Card style={{ margin: 24 }}>
      <Typography.Title level={3}>Quản lý Banner Admin</Typography.Title>
      <Table dataSource={banners} columns={columns} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
      <Modal
        open={rejectModal}
        title="Nhập lý do từ chối banner"
        onCancel={() => { setRejectModal(false); setRejectReason(""); setRejectId(null); }}
        onOk={handleReject}
        okText="Từ chối"
        cancelText="Hủy"
      >
        <Input.TextArea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={4} placeholder="Nhập lý do từ chối..." />
      </Modal>
      {/* Modal xem ảnh to */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        centered
        width={1000}
      >
        <img src={previewImage} alt="banner preview" style={{ width: "100%", borderRadius: 8 }} />
      </Modal>
    </Card>
  );
};

export default BannerAdminPage;
