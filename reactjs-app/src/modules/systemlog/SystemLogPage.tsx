import React, { useEffect, useState } from 'react';
import { Table, Typography, Input, Select, DatePicker, Button, Space } from 'antd';
import { fetchSystemLogs, fetchSystemLogsWithFilter } from './systemlog.service';
import type { SystemLog } from './systemlog.type';
import dayjs from 'dayjs';

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

const SystemLogPage: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [actor, setActor] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [dateRange, setDateRange] = useState<any>(null);

  const handleSearch = async () => {
    setLoading(true);
    await fetchSystemLogsWithFilter({
      actor: actor || undefined,
      status: status || undefined,
      start: dateRange && dateRange[0] ? dayjs(dateRange[0]).toISOString() : undefined,
      end: dateRange && dateRange[1] ? dayjs(dateRange[1]).toISOString() : undefined,
    })
      .then(data => setLogs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchSystemLogs()
      .then(data => setLogs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Title level={3} style={{ marginBottom: 20 }}>System Logs</Title>
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Actor (email, username...)"
          value={actor}
          onChange={e => setActor(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Status"
          value={status || undefined}
          onChange={v => setStatus(v)}
          allowClear
          style={{ width: 140 }}
        >
          <Select.Option value="SUCCESS">SUCCESS</Select.Option>
          <Select.Option value="FAILURE">FAILURE</Select.Option>
        </Select>
        <DatePicker.RangePicker
          value={dateRange}
          onChange={setDateRange}
          style={{ width: 260 }}
          showTime
        />
        <Button type="primary" onClick={handleSearch}>Search</Button>
        <Button onClick={() => {
          setActor(''); setStatus(''); setDateRange(null);
          setLoading(true);
          fetchSystemLogs()
            .then(data => setLogs(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
        }}>Reset</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={logs}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 20 }}
        scroll={{ x: 800 }}
        style={{ minWidth: 700 }}
      />
    </div>
  );
};

export default SystemLogPage;
