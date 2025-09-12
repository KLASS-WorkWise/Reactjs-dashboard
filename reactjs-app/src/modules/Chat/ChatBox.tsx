/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { addDoc, collection, onSnapshot, query, QuerySnapshot, Timestamp } from 'firebase/firestore';
import { Button, Form, Input, Avatar, List } from 'antd';
import { db } from './libraries/firebase/initializaApp';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ChatBoxProps {
    currentUser: string; // id của employer
}

// Hàm fetch user từ API
const fetchUsers = async () => {
    const res = await axios.get('/api/users');
    return res.data.data;
};

export default function ChatBox({ currentUser }: ChatBoxProps) {
    const [messages, setMessages] = React.useState<any[]>([]);
    const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

    // Lấy danh sách user bằng React Query
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    // Khi có users, set user đầu tiên làm selectedUser
    React.useEffect(() => {
        if (users.length > 0 && !selectedUser) {
            setSelectedUser(users[0].username);
        }
    }, [users, selectedUser]);

    const messagesRef = collection(db, 'messages');

    React.useEffect(() => {
        if (!selectedUser) return;
        const q = query(messagesRef);
        const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
            const items: any[] = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            // Chỉ lấy tin nhắn giữa employer và user đang chọn
            const filtered = items.filter(
                (msg) =>
                    (msg.from === currentUser && msg.to === selectedUser) ||
                    (msg.from === selectedUser && msg.to === currentUser)
            );
            const sortedItems = filtered.sort((a, b) => {
                return (a.created_at as Timestamp).toMillis() - (b.created_at as Timestamp).toMillis();
            });
            setMessages(sortedItems);
        });
        return () => {
            unsubscribe();
        };
    }, [selectedUser, currentUser]);

    const onFinish = async (values: any) => {
        await addDoc(collection(db, 'messages'), {
            from: currentUser,
            to: selectedUser,
            content: values.message,
            created_at: Timestamp.fromDate(new Date()),
        });
    };

    // Tìm thông tin user đang chat
    const chattingUser = users.find(u => u.username === selectedUser);

    return (
        <div style={{ display: 'flex', height: '500px', background: '#18191a', borderRadius: 8, overflow: 'hidden' }}>
            {/* Sidebar user list */}
            <div style={{ width: 220, background: '#242526', borderRight: '1px solid #222', padding: '16px 0' }}>
                {isLoading ? (
                    <div style={{ color: '#fff', textAlign: 'center' }}>Đang tải...</div>
                ) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={users}
                        renderItem={(user: any) => (
                            <List.Item
                                style={{ cursor: 'pointer', background: selectedUser === user.username ? '#3a3b3c' : undefined }}
                                onClick={() => setSelectedUser(user.username)}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://i.pravatar.cc/40?u=${user.username}`} />}
                                    title={<span style={{ color: '#fff' }}>{user.fullName || user.username}</span>}
                                />
                            </List.Item>
                        )}
                    />
                )}
            </div>
            {/* Chat area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', background: '#18191a' }}>
                {/* Header: Tên user đang chat */}
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', background: '#242526' }}>
                    <Avatar src={chattingUser ? `https://i.pravatar.cc/40?u=${chattingUser.username}` : ''} />
                    <span style={{ marginLeft: 12, fontWeight: 600, fontSize: 18, color: '#fff' }}>
                        {chattingUser ? (chattingUser.fullName || chattingUser.username) : ''}
                    </span>
                </div>
                {/* Chat messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
                    {messages.map((msg, idx) => {
                        const isMe = msg.from === currentUser;
                        const userInfo = users.find(u => u.username === msg.from) || { username: '', fullName: '' };
                        return (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    flexDirection: isMe ? 'row-reverse' : 'row',
                                    alignItems: 'flex-end',
                                    marginBottom: 12,
                                }}
                            >
                                <Avatar src={`https://i.pravatar.cc/40?u=${userInfo.username}`} />
                                <div
                                    style={{
                                        maxWidth: 320,
                                        background: isMe ? '#1877f2' : '#3a3b3c',
                                        color: isMe ? '#fff' : '#e4e6eb',
                                        borderRadius: 16,
                                        padding: '8px 16px',
                                        marginLeft: isMe ? 0 : 8,
                                        marginRight: isMe ? 8 : 0,
                                        fontSize: 15,
                                    }}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* Input gửi tin nhắn */}
                <div style={{ padding: 16, borderTop: '1px solid #222', background: '#242526' }}>
                    <Form onFinish={onFinish} layout="inline">
                        <Form.Item name="message" style={{ flex: 1, marginRight: 8 }}>
                            <Input placeholder="Aa" autoComplete="off" style={{ background: '#3a3b3c', color: '#fff', border: 'none', borderRadius: 20 }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ background: '#1877f2', border: 'none', borderRadius: 20 }}>Gửi</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}