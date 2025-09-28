import React, { useEffect, useState } from "react";
import { Button, Input, Spin, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./CompanyInformation.css";

interface CompanyInfo {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  industry: string;
  minEmployees: number;
  maxEmployees: number;
  description: string;
  status: string;
  bannerUrl?: string;
  logoUrl?: string;
}

const CompanyInformationPage: React.FC = () => {
  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Partial<CompanyInfo>>({});

  // TODO: Replace with dynamic employerId from session/localStorage
  const employerId = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/company/employer/${employerId}`);
      if (!res.ok) throw new Error("Không thể lấy thông tin công ty");
      const data = await res.json();
      setInfo(data);
      setForm(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        message.error(e.message || "Lỗi khi tải dữ liệu");
      } else {
        message.error("Lỗi khi tải dữ liệu");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CompanyInfo, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // API update company info (method/endpoint may need adjustment)
      const res = await fetch(`http://localhost:8080/api/company/employer/${employerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      message.success("Cập nhật thành công");
      setEdit(false);
      fetchData();
    } catch (e: unknown) {
      if (e instanceof Error) {
        message.error(e.message || "Lỗi khi cập nhật");
      } else {
        message.error("Lỗi khi cập nhật");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "4rem 0" }}><Spin size="large" /></div>;
  }

  if (!info) {
    return <div className="company-info-empty">Không có thông tin công ty.</div>;
  }

  return (
    <div className="company-info-page-root">
      <div className="company-info-banner-wrap">
        <img
          src={info.bannerUrl || "/assets/static/default-banner.jpg"}
          alt="Banner"
          className="company-info-banner"
        />
        <div className="company-info-avatar-wrap">
          <img
            src={info.logoUrl || "/assets/static/default-avatar.png"}
            alt="Logo"
            className="company-info-avatar"
          />
        </div>
      </div>
      <div className="company-info-content">
        <h2 className="company-info-company-name">
          {edit ? (
            <Input
              value={form.companyName}
              onChange={e => handleChange("companyName", e.target.value)}
              style={{ fontWeight: 700, fontSize: 24 }}
            />
          ) : (
            info.companyName
          )}
        </h2>
        <div className="company-info-info-grid">
          <p className="company-info-info-row">
            <MailOutlined className="company-info-icon" />
            <span className="company-info-label">Email:</span>
            {edit ? (
              <Input
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                size="small"
                style={{ marginLeft: 8 }}
              />
            ) : (
              <span className="company-info-value">{info.email}</span>
            )}
          </p>
          <p className="company-info-info-row">
            <PhoneOutlined className="company-info-icon" />
            <span className="company-info-label">Phone:</span>
            {edit ? (
              <Input
                value={form.phone}
                onChange={e => handleChange("phone", e.target.value)}
                size="small"
                style={{ marginLeft: 8 }}
              />
            ) : (
              <span className="company-info-value">{info.phone}</span>
            )}
          </p>
          <p className="company-info-info-row">
            <EnvironmentOutlined className="company-info-icon" />
            <span className="company-info-label">Địa chỉ:</span>
            {edit ? (
              <Input
                value={form.address}
                onChange={e => handleChange("address", e.target.value)}
                size="small"
                style={{ marginLeft: 8 }}
              />
            ) : (
              <span className="company-info-value">{info.address}</span>
            )}
          </p>
          <p className="company-info-info-row">
            <GlobalOutlined className="company-info-icon" />
            <span className="company-info-label">Website:</span>
            {edit ? (
              <Input
                value={form.website}
                onChange={e => handleChange("website", e.target.value)}
                size="small"
                style={{ marginLeft: 8 }}
              />
            ) : (
              <a
                href={info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="company-info-link"
              >
                {info.website}
              </a>
            )}
          </p>
          <p className="company-info-info-row">
            <span className="company-info-label">Ngành nghề:</span>
            {edit ? (
              <Input
                value={form.industry}
                onChange={e => handleChange("industry", e.target.value)}
                size="small"
                style={{ marginLeft: 8 }}
              />
            ) : (
              info.industry
            )}
          </p>
          <p className="company-info-info-row">
            <TeamOutlined className="company-info-icon" />
            <span className="company-info-label">Quy mô:</span>
            {edit ? (
              <span style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8 }}>
                <Input
                  value={form.minEmployees}
                  onChange={e => handleChange("minEmployees", e.target.value)}
                  size="small"
                  style={{ width: 60 }}
                  type="number"
                />
                <span>-</span>
                <Input
                  value={form.maxEmployees}
                  onChange={e => handleChange("maxEmployees", e.target.value)}
                  size="small"
                  style={{ width: 60 }}
                  type="number"
                />
              </span>
            ) : (
              <span className="company-info-value">{info.minEmployees} - {info.maxEmployees}</span>
            )}
          </p>
        </div>
        <div className="company-info-desc-wrap">
          <span className="company-info-desc-label">Mô tả:</span>
          {edit ? (
            <Input.TextArea
              value={form.description}
              onChange={e => handleChange("description", e.target.value)}
              autoSize={{ minRows: 3 }}
              style={{ background: "#f9fafb" }}
            />
          ) : (
            <p className="company-info-desc">{info.description}</p>
          )}
        </div>
        <div className="company-info-status-wrap">
          <span className="company-info-status-label">Trạng thái:</span>
          <span
            className={`company-info-status-badge ${
              info.status === "APPROVED"
                ? "company-info-status-approved"
                : info.status === "PENDING"
                ? "company-info-status-pending"
                : "company-info-status-rejected"
            }`}
          >
            {info.status}
          </span>
        </div>
        <div className="company-info-btn-group">
          {edit ? (
            <>
              <Button onClick={() => setEdit(false)} className="company-info-btn-reject">Hủy</Button>
              <Button type="primary" onClick={handleSave} className="company-info-btn-approve">Lưu</Button>
            </>
          ) : (
            <Button type="primary" onClick={() => setEdit(true)} className="company-info-btn-approve">Chỉnh sửa</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInformationPage;
