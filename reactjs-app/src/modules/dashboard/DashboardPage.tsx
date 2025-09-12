import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Line, Column, Pie } from "@ant-design/plots";
import { Card, Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

const DashboardPage = () => {
  // State cho thống kê dùng React Query
  const {
    data: stats = {
      totalUsers: 0,
      totalEmployers: 0,
      totalCandidates: 0,
      totalJobPostings: 0,
      totalApplications: 0,
    },
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats
  } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8080/api/statistics/overview");
      return res.data;
    },
    refetchInterval: 5000, // tự động refetch mỗi 5 giây
    refetchIntervalInBackground: false // chỉ refetch khi tab đang active
  });

  // State cho năm lọc
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
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
  function normalizeMonth(raw: string | number | null | undefined) {
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
  function fillMonthsToCurrent(
    data: Array<{ month: string | number | null | undefined;[key: string]: any }>,
    valueKey = "value"
  ) {
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

  // ...existing code...

  // Lấy dữ liệu từ api chart theo năm chọn
  useEffect(() => {
    axios.get(`http://localhost:8080/api/statistics/chart-data?year=${selectedYear}`)
      .then(res => {
        setChartData({
          userGrowth: res.data.userGrowth || [],
          jobPosting: res.data.jobPosting || [],
          conversion: res.data.conversion || 0,
        });
      })
      .catch(err => console.error("Error fetching chart-data:", err));
  }, [selectedYear]);

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
  // Đảm bảo conversionRate là số hợp lệ (0-100)
  let conversionRate = Number(chartData.conversion);
  if (!Number.isFinite(conversionRate) || conversionRate < 0) conversionRate = 0;
  if (conversionRate > 100) conversionRate = 100;
  conversionRate = Math.round(conversionRate);
  const conversionData = [
    { type: "Converted", value: conversionRate },
    { type: "Not Converted", value: 100 - conversionRate },
  ];
  // Log để debug giá trị conversionData
  // console.log('conversionData:', conversionData);

  // Config charts 
  const userGrowthConfig = {
    data: userGrowthData,
    xField: "month",
    yField: "value",
    smooth: true,
    point: { size: 4 },
    height: 200,
    yAxis: {
      min: 0,
      nice: true, // để scale tự động theo dữ liệu tăng lên bnh cột scale tự giãn nở đến giới hạn trên 10 
    },
  };
  const jobPostingConfig = {
    data: jobPostingData,
    xField: "month",
    yField: "value",
    columnStyle: { radius: [4, 4, 0, 0] },
    height: 200,
    yAxis: {
      min: 0,
      nice: true, // tự động scale
    },
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
      // Bỏ type: 'inner' để tránh lỗi
      offset: "-30%",
      content: ({ value }: { value: number }) => `${value}%`,
      style: { fontSize: 14, fontWeight: 600 },
    },
    height: 160,
  };

  // Giao diện các thẻ thống kê ngang
  const statCards = [
    { title: "Users", value: stats.totalUsers, icon: "👤", color: "#4F8AFF" },
    { title: "Employers", value: stats.totalEmployers, icon: "🏢", color: "#6DD400" },
    { title: "Candidates", value: stats.totalCandidates, icon: "🧑‍💼", color: "#FFC542" },
    { title: "Job Postings", value: stats.totalJobPostings, icon: "📄", color: "#FF6B6B" },
    { title: "Applications", value: stats.totalApplications, icon: "📨", color: "#9B8AFC" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <Title level={3} style={{ margin: 0, marginRight: 16 }}>
          Admin Analytics
        </Title>
        <Select
          style={{ width: 120 }}
          value={selectedYear}
          onChange={setSelectedYear}
          options={Array.from({ length: 5 }, (_, i) => ({ value: currentYear - i, label: currentYear - i }))}
        />
      </div>

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
            <Text type="secondary">New Users</Text>
            <Line {...userGrowthConfig} />
          </Card>
        </Col>

        {/* Job Postings */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Job Postings</Title>
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
            {(conversionData.every(d => Number.isFinite(d.value) && !isNaN(d.value) && d.value >= 0 && d.value <= 100)) ? (
              <Pie {...conversionConfig} />
            ) : (
              <Text type="danger">No valid data for chart</Text>
            )}
          </Card>
        </Col>

        {/* CV Submitted */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>CV Submitted</Title>
            <Title level={2}>{cvSubmittedData.reduce((sum, item) => sum + item.value, 0)}</Title>
            <Text type="secondary">CV Submitted</Text>
            <Column {...cvSubmittedConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
