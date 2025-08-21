import React from "react";
import { Modal, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  TeamOutlined,
} from "@ant-design/icons";

interface EmployerDetailModalProps {
  open: boolean;
  onCancel: () => void;
  employer: any | null;

  onApprove?: () => void;   // thêm callback cho Phê duyệt
  onReject?: () => void;    // thêm callback cho Từ chối
}

const EmployerDetailModal: React.FC<EmployerDetailModalProps> = ({
  open,
  onCancel,
  employer,
  onApprove,
  onReject,
}) => {
  const info = employer?.companyInformation;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={750}
      title={
        <span className="text-blue-700 font-bold text-xl">
          Hồ sơ công ty
        </span>
      }
      className="rounded-2xl overflow-hidden p-0"
    >
      {info ? (
        <div className="space-y-6 text-base">
          {/* Banner + Avatar */}
          <div className="relative">
            <img
              src={info.bannerUrl || "/assets/static/default-banner.jpg"}
              alt="Banner"
              className="w-full h-48 object-cover"
            />
            <img
              src={info.logoUrl || "/assets/static/default-avatar.png"}
              alt="Logo"
              className="absolute left-10 -bottom-12 w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg bg-white"
            />
          </div>

          {/* Company Info */}
          <div className="mt-14 px-10 pb-6">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">
              {info.companyName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
              <p>
                <MailOutlined className="mr-2 text-blue-500" />
                <strong>Email:</strong> {info.email}
              </p>
              <p>
                <PhoneOutlined className="mr-2 text-blue-500" />
                <strong>Phone:</strong> {info.phone}
              </p>
              <p>
                <EnvironmentOutlined className="mr-2 text-blue-500" />
                <strong>Địa chỉ:</strong> {info.address}
              </p>
              <p>
                <GlobalOutlined className="mr-2 text-blue-500" />
                <strong>Website:</strong>{" "}
                <a
                  href={info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {info.website}
                </a>
              </p>
              <p>
                <strong>Ngành nghề:</strong> {info.industry}
              </p>
              <p>
                <TeamOutlined className="mr-2 text-blue-500" />
                <strong>Quy mô:</strong> {info.minEmployees} - {info.maxEmployees}
              </p>
            </div>

            <div className="mt-4">
              <strong className="block mb-1 text-blue-600">Mô tả:</strong>
              <p className="text-justify leading-relaxed">{info.description}</p>
            </div>

            <div className="mt-5">
              <strong className="text-blue-600 mr-2">Trạng thái:</strong>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  info.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {info.status}
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                onClick={() => {
                  if (onReject) onReject();
                }}
                danger
                className="font-semibold"
              >
                Từ chối
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  if (onApprove) onApprove();
                }}
                className="bg-blue-600 font-semibold"
              >
                Phê duyệt
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">Không có thông tin công ty.</p>
      )}
    </Modal>
  );
};

export default EmployerDetailModal;
