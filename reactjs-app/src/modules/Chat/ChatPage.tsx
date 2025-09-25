import React, { useState } from "react";
import SidebarApplicants from "./SidebarApplicants";
import ChatBox from "./ChatBox";

// Giả sử bạn lấy employerId từ context hoặc props
// For testing use the employerId found in Firestore (e.g. 5)
const employerId = "5"; // Thay bằng id thực tế của nhà tuyển dụng
// currentUserId là id của nhà tuyển dụng hiện tại
const currentUserId = employerId;

const ChatPage: React.FC = () => {
  // selectedApplicant holds both id and optional name
  const [selectedApplicant, setSelectedApplicant] = useState<{ applicantId: string; applicantName?: string } | null>(null);
  // Giả sử chatId là kết hợp employerId và applicantId
  const chatId = selectedApplicant ? `${employerId}_${selectedApplicant.applicantId}` : "";

  return (
    <div style={{ display: "flex", height: "80vh", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <div style={{ width: 280, borderRight: "1px solid #eee", padding: 0 }}>
        <SidebarApplicants employerId={employerId} onSelectApplicant={setSelectedApplicant} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {selectedApplicant ? (
          <ChatBox chatId={chatId} currentUserId={currentUserId} initialApplicantName={selectedApplicant.applicantName} />
        ) : (
          <div style={{ padding: 32, textAlign: "center", color: "#888" }}>
            Chọn ứng viên để bắt đầu chat
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;