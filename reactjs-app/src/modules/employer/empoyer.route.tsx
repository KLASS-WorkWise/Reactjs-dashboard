import { DatabaseOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import EmployerPage from "./EmployerPage";



export const routesEmployer: RouteItem[] = [
    {
        path: '',
        label: <span style={{ fontSize: 18, fontWeight: 'bold', color: '#66789c' }}>Employers</span>,
        key: 'employer',
        icon: <DatabaseOutlined style={{ fontSize: 21, color: '#66789c' }} />,
        isShowMenu: true,
        isPrivate: true,
        children: [
            {
                path: '/employer',
                label: <span style={{ fontSize: 17, fontWeight: 'bold' }}>Employers</span>,
                key: 'employer',
                icon: <DatabaseOutlined style={{ fontSize: 20, color: '#66789c' }} />,
                element: <EmployerPage />,
                isShowMenu: true,
                isPrivate: true,
            },
            {
                path: '/employer2',
                label: <span style={{ fontSize: 17, fontWeight: 'bold' }}>Employers</span>,
                key: 'employer2',
                icon: <DatabaseOutlined style={{ fontSize: 20, color: '#66789c' }} />,
                element: <EmployerPage />,
                isShowMenu: true,
                isPrivate: true,
            }
        ]
    },
]