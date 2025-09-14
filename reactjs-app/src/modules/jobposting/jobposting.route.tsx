import { UserOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import JobPostingPage from "./JobPostingPage";



export const routesjobPosting: RouteItem[] = [
    {
        path: '/jobposting',
        label: <span style={{ fontSize: 18, fontWeight: 'bold' }}>Job Posting</span>,
        key: 'jobposting',
        icon: <UserOutlined style={{ fontSize: 22, color: '#66789c' }} />,
        element: <JobPostingPage />,
        isShowMenu: true,
        isPrivate: true,
        roles : ["Employers"], // Chỉ Admin và Manager có quyền truy cập
    },
];