import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { fetchSystemLogs } from './systemLogs.service';

const columns = [
    { title: 'Thời gian', dataIndex: 'timestamp', key: 'timestamp' },
    { title: 'Người thực hiện', dataIndex: 'actor', key: 'actor' },
    { title: 'ID User bị tác động', dataIndex: 'targetUserId', key: 'targetUserId' }, // Thêm dòng này
    { title: 'Hành động', dataIndex: 'action', key: 'action', render: (text: string) => <Tag color="blue">{text}</Tag> },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Level', dataIndex: 'level', key: 'level', render: (text: string) => <Tag color={text === 'INFO' ? 'green' : 'red'}>{text}</Tag> },
];

const SystemLogsPage: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchSystemLogs()
            .then((data) => setLogs(data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h2 style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 16 }}>System Logs</h2>
            <Table columns={columns} dataSource={logs} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
        </div>
    );
};

export default SystemLogsPage;
