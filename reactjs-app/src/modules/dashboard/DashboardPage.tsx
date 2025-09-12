import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Column, Pie } from "@ant-design/plots";
import { Card, Row, Col, Typography } from "antd";
const { Title, Text } = Typography;
const DashboardPage = () => {
  // State cho thống kê
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    totalCandidates: 0,
    totalJobPostings: 0,
    totalApplications: 0,
  });
  // vẽ biểu đồ colum và line set dlieu ban đầu là rỗng
  const [chartData, setChartData] = useState({
    userGrowth: [],
    jobPosting: [],
    conversion: 0,
  });
  // Hàm chuẩn hóa dữ liệu chỉ hiển thị đến tháng hiện tại
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthIdx = new Date().getMonth(); // 0-based
  // Chuẩn hóa month từ API về dạng "Jan", "Feb", ...
  function normalizeMonth(raw) {
    if (!raw) return null;
    if (typeof raw === "number" || /^\d+$/.test(String(raw))) {
      const idx = Number(raw) - 1;
      return MONTHS[idx] || null;
    }
    const s = String(raw).trim();
    const three = s.slice(0, 3).toLowerCase();
    return three.charAt(0).toUpperCase() + three.slice(1);
  }
  // Fill dữ liệu từ Jan đến tháng hiện tại
  function fillMonthsToCurrent(data, valueKey = "value") {
    const map = new Map();
    (data || []).forEach(item => {
      const m = normalizeMonth(item.month);
      if (!m) return;
      const v = Number(item[valueKey]);
      map.set(m, Number.isFinite(v) ? v : 0);
    });
    return MONTHS.slice(0, currentMonthIdx + 1).map(month => ({
      month,
      value: map.get(month) || 0,
    }));
  }
  // Lấy dữ liệu từ api overview
  useEffect(() => {
    axios.get("http://localhost:8080/api/statistics/overview")
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching overview:", err));
  }, []);
  // Lấy dữ liệu từ api chart
  useEffect(() => {
    const year = new Date().getFullYear();
    axios.get(`http://localhost:8080/api/statistics/chart-data?year=${year}`)
      .then(res => {
        console.log("chart-data raw:", res.data); // debug
        setChartData({
          userGrowth: res.data.userGrowth || [],
          jobPosting: res.data.jobPosting || [],
          conversion: res.data.conversion || 0,
        });
      })
      .catch(err => console.error("Error fetching chart-data:", err));
  }, []);
  // Chuẩn hóa dữ liệu cho chart
  const userGrowthData = fillMonthsToCurrent(chartData.userGrowth);
  const jobPostingData = fillMonthsToCurrent(chartData.jobPosting);
  // dữ liệu mẫu cho CV (giữ nguyên)
  const cvSubmittedData = [
    { month: "Jul", value: 120 },
    { month: "Aug", value: 180 },
    { month: "Sep", value: 220 },
    { month: "Oct", value: 260 },
    { month: "Nov", value: 310 },
    { month: "Dec", value: 370 },
  ];
  // Conversion Rate lấy từ API thay vì hard-code
  const conversionRate = Math.round(chartData.conversion); // làm tròn nếu cần
  const conversionData = [
    { type: "Converted", value: conversionRate },
    { type: "Not Converted", value: 100 - conversionRate },
  ];
  // Config charts
  const userGrowthConfig = {
    data: userGrowthData,
    xField: "month",
    yField: "value",
    smooth: true,
    point: { size: 4 },
    height: 200,
  };
  const jobPostingConfig = {
    data: jobPostingData,
    xField: "month",
    yField: "value",
    columnStyle: { radius: [4, 4, 0, 0] },
    height: 200,
  };
  const cvSubmittedConfig = {
    data: cvSubmittedData,
    xField: "month",
    yField: "value",
    columnStyle: { radius: [4, 4, 0, 0] },
    color: "#48C9B0",
    height: 200,
  };
  const conversionConfig = {
    data: conversionData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ value }) => `${value}%`,
      style: { fontSize: 14, fontWeight: 600 },
    },
    height: 160,
  };
  // Giao diện các thẻ thống kê ngang
  const statCards = [
    { title: "Users", value: stats.totalUsers, icon: ":bust_in_silhouette:", color: "#4F8AFF" },
    { title: "Employers", value: stats.totalEmployers, icon: ":office:", color: "#6DD400" },
    { title: "Candidates", value: stats.totalCandidates, icon: ":office_worker:", color: "#FFC542" },
    { title: "Job Postings", value: stats.totalJobPostings, icon: ":page_facing_up:", color: "#FF6B6B" },
    { title: "Applications", value: stats.totalApplications, icon: ":incoming_envelope:", color: "#9B8AFC" },
  ];
  return (
    <div style={{ padding: 20 }}>
      <Title level={3} style={{ marginBottom: 20 }}>
        Admin Analytics
      </Title>
      {/* Thẻ thống kê ngang */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statCards.map(card => (
          <Col key={card.title} xs={24} sm={12} md={8} lg={4}>
            <Card style={{ textAlign: 'center', borderTop: `4px solid ${card.color}` }}>
              <div style={{ fontSize: 32 }}>{card.icon}</div>
              <Title level={2} style={{ margin: 0 }}>{card.value}</Title>
              <Text type="secondary">{card.title}</Text>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[20, 20]}>
        {/* User Growth */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>User Growth</Title>
            <Title level={2}>8,140</Title>
            <Text type="secondary">New Users</Text>
            <Line {...userGrowthConfig} />
          </Card>
        </Col>
        {/* Job Postings */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Job Postings</Title>
            <Title level={2}>1,850</Title>
            <Text type="secondary">New Job Postings</Text>
            <Column {...jobPostingConfig} />
          </Card>
        </Col>
        {/* Conversion Rate */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Conversion Rate</Title>
            <Title level={2}>{conversionRate}%</Title>
            <Text type="secondary">Conversion Rate</Text>
            <Pie {...conversionConfig} />
          </Card>
        </Col>
        {/* CV Submitted */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>CV Submitted</Title>
            <Title level={2}>370</Title>
            <Text type="secondary">CV Submitted</Text>
            <Column {...cvSubmittedConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default DashboardPage;