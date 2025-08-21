import { UserOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import EmployerListPage from "./EmployerPage";

export const routesEmployer: RouteItem[] = [
    {
        path: '/employers',
        label: 'employers',
        key: 'employers',
        icon: <UserOutlined />,
        element: <EmployerListPage />,
        isShowMenu: true,
        isPrivate: true,
    },
];