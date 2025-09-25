
import React, { useState } from 'react';
import { Table, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchSystemLogsPaged } from './systemlog.service';
import type { SystemLog } from './systemlog.type';

const { Title } = Typography;

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 50 },
  {
    title: 'Actor',
    dataIndex: 'actor',
    key: 'actor',
    render: (text: string) => (
      <span style={{ fontWeight: 'bold', fontSize: 14 }}>{text}</span>
    ),
    width: 120,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (text: string) => (
      <span style={{ fontWeight: 'bold',  }}>{text}</span>
    ),
    width: 120,
  },
  { title: 'Description', dataIndex: 'description', key: 'description', width: 120 },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <span style={{
        fontWeight: 'bold',
        color: status === 'SUCCESS' ? 'green' : 'red',
        background: status === 'SUCCESS' ? '#e6ffed' : '#fff1f0',
        padding: '2px 8px',
        borderRadius: 8,
        display: 'inline-block',
        minWidth: 70,
        textAlign: 'center',
      }}>{status}</span>
    ),
    width: 90,
  },
  { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp', width: 160 },
];



const SystemLogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const querySystemLogs = useQuery({
    queryKey: ["systemlogs", currentPage],
    queryFn: async () => fetchSystemLogsPaged(currentPage - 1, 10), // BE page bắt đầu từ 0
    placeholderData: {
      data: [],
      pageNumber: 0,
      pageSize: 10,
      totalRecords: 0,
      totalPages: 0,
      hasNext: false,
      hasPrevious: false,
    },
  });

  const logs = querySystemLogs.data?.data ?? [];
  const pagination = {
    current: (querySystemLogs.data?.pageNumber ?? 0) + 1,
    pageSize: querySystemLogs.data?.pageSize ?? 10,
    total: querySystemLogs.data?.totalRecords ?? 0,
    onChange: (page: number) => setCurrentPage(page),
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={3} style={{ marginBottom: 20 }}>System Logs</Title>
      <Table
        columns={columns}
        dataSource={logs}
        rowKey="id"
        loading={querySystemLogs.isLoading}
        pagination={pagination}
        scroll={{ x: 800 }}
        style={{ minWidth: 700 }}
      />
    </div>
  );
};

export default SystemLogPage;
