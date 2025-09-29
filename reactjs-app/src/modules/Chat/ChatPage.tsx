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
    <div style={{
      display: "flex",
      height: "80vh",
      background: "linear-gradient(120deg, #f0f4ff 0%, #f8fafc 100%)",
      borderRadius: 16,
      boxShadow: "0 4px 24px #dbeafe",
      padding: 16,
      margin: 16,
      border: '1.5px solid #e0e7ef',
      minHeight: 500
    }}>
      <div style={{ width: 280, borderRight: "1.5px solid #e0e7ef", padding: 0, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e0e7ef', marginRight: 16 }}>
        <SidebarApplicants employerId={employerId} onSelectApplicant={setSelectedApplicant} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px #e0e7ef', padding: 0 }}>
        {selectedApplicant ? (
          <ChatBox chatId={chatId} currentUserId={currentUserId} initialApplicantName={selectedApplicant.applicantName} />
        ) : (
          <div style={{ padding: 48, textAlign: "center", color: "#888", fontSize: 18 }}>
            <div style={{marginBottom: 12, fontSize: 32}}>💬</div>
            Select a candidate to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;