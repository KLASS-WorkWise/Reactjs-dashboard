import { Table, Card, Typography, Spin, Select, Input, Row, Col } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchManagerJobs } from "../managerjob.service";
import type { ManagerJobType } from "../managerjob.type";

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tiêu đề", dataIndex: "title", key: "title" },
  { title: "Nhà tuyển dụng", dataIndex: "employerName", key: "employerName" },
  { title: "Địa điểm", dataIndex: "location", key: "location" },
  { title: "Lương", dataIndex: "salaryRange", key: "salaryRange" },
  { title: "Loại việc", dataIndex: "jobType", key: "jobType" },
  { title: "Kinh nghiệm(year)", dataIndex: "minExperience", key: "minExperience" },
  { title: "Trạng thái", dataIndex: "status", key: "status" },
  { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
  {
    title: "Loại bài",
    dataIndex: "postType",
    key: "postType",
    render: (value: string) => {
      if (value === "VIP") {
        return <span style={{ color: "#ff4d4f", fontWeight: 800, fontSize: 30 }}>VIP</span>;
      }
    else {
        return <span style={{ color: "#1890ff", fontWeight: 700, fontSize: 25 }}>NORMAL</span>;
    }
      return value;
    },
  },
];

export default function FileJobPosting() {
  const { data, isLoading } = useQuery<ManagerJobType[]>({
    queryKey: ["manager-jobs"],
    queryFn: fetchManagerJobs,
  });

  const [filterType, setFilterType] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");

  const filteredData = (data || []).filter(job => {
    const matchType = filterType === "all" || job.postType === filterType;
    const keyword = searchText.toLowerCase();
    const matchKeyword = job.title.toLowerCase().includes(keyword) || job.location.toLowerCase().includes(keyword);
    return matchType && matchKeyword;
  });

  return (
    <Card style={{ margin: 24 }}>
      <Row align="middle" justify="end" gutter={16} style={{ marginBottom: 8 }}>
        <Col>
          <Select
            value={filterType}
            onChange={setFilterType}
            style={{ width: 120 }}
          >
            <Select.Option value="all">Tất cả</Select.Option>
            <Select.Option value="VIP">VIP</Select.Option>
            <Select.Option value="NORMAL">NORMAL</Select.Option>
          </Select>
        </Col>
        <Col>
          <Input
            placeholder="Tìm kiếm theo tên hoặc địa điểm"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 220 }}
          />
        </Col>
      </Row>
      <Typography.Title level={3} style={{ marginBottom: 16 }}>Danh sách Job</Typography.Title>
      {isLoading ? (
        <Spin style={{ display: "block", margin: "40px auto" }} />
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </Card>
  );
}
