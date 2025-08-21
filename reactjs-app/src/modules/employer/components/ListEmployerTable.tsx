import { useEffect, useState } from "react";
import { fetchEmployers, approveEmployer, rejectEmployer } from "../employer.service";
import { EyeOutlined } from "@ant-design/icons";
import { notification } from "antd";
import EmployerDetailModal from "./EmployerDetailModal";

const ListEmployerTable = () => {
  const [employers, setEmployers] = useState<any[]>([]);
  const [selectedEmployer, setSelectedEmployer] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadData = () => {
    fetchEmployers().then((data) => {
      setEmployers(Array.isArray(data?.data) ? data.data : []);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleShowDetail = (employer: any) => {
    setSelectedEmployer(employer);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEmployer(null);
  };

  const handleApprove = async () => {
    try {
      await approveEmployer(selectedEmployer.id);
      notification.success({ message: "Phê duyệt thành công!" });
      handleCloseModal();
      loadData();
      console.log("Employer approved:", selectedEmployer);
    } catch (e) {
      notification.error({ message: "Phê duyệt thất bại!" });
      console.error("Error approving employer:", e);
    }
  };

  const handleReject = async () => {
    try {
      await rejectEmployer(selectedEmployer.id);
      notification.success({ message: "Từ chối thành công!" });
      handleCloseModal();
      loadData();
      console.log("Employer rejected:", selectedEmployer);
    } catch (e) {
      notification.error({ message: "Từ chối thất bại!" });
      console.error("Error rejecting employer:", e);
    }
  };

  return (
    <div className="p-8 min-h-[calc(100vh-100px)] flex items-start bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full h-full border border-blue-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700 tracking-wide">Danh sách cần phê duyệt </h2>
        </div>
        <div className="overflow-x-auto h-full">
          <table className="w-full table-auto rounded-lg h-full border border-gray-200">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Username</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Full Name</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Company</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {employers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    Không có  employer nào cần phê duyệt.
                  </td>
                </tr>
              ) : (
                employers.map((emp, index) => (
                  <tr key={emp.id} className={`transition-all duration-200 hover:bg-blue-50 ${index % 2 === 0 ? "bg-white" : "bg-blue-50"}`}>
                    <td className="px-4 py-3 font-medium">{emp.username}</td>
                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3">{emp.fullName}</td>
                    <td className="px-4 py-3">{emp.phoneNumber || "-"}</td>
                    <td className="px-4 py-3">{emp.companyInformation?.companyName || "-"}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleShowDetail(emp)} className="border border-blue-400 rounded-lg px-3 py-1 flex items-center gap-2 text-blue-700 hover:bg-blue-100 hover:scale-105 transition font-semibold">
                        <EyeOutlined /> Chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Chi tiết công ty */}
      <EmployerDetailModal
        open={isModalVisible}
        onCancel={handleCloseModal}
        employer={selectedEmployer}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default ListEmployerTable;
