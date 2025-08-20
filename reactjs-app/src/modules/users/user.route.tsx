import { UserOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import UserListPage from "./UserPage";

export const routesUser: RouteItem[] = [
    {
        path: '/users',
        label: 'Users',
        key: 'users',
        icon: <UserOutlined />,
        element: <UserListPage />,
        isShowMenu: true,
        isPrivate: true,
    },
];