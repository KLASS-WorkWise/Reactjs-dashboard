import { GroupOutlined, UserOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import UserPage from "./UserPage";

export const routesAdministrator: RouteItem[] = [
  {
    label: 'Administrators',
    key: 'administrators',
    icon: <UserOutlined />,
    isShowMenu: true,
    isPrivate: true,
    children: [
      {
        path: '/users',
        label: 'Users',
        key: 'users',
        icon: <UserOutlined />,
        element: <UserPage />,
        isShowMenu: true,
        isPrivate: true,
      },
      {
        path: '/administrators/roles',
        label: 'Roles',
        icon: <GroupOutlined />,
        key: 'administrators-roles',
        element: null,
        isShowMenu: true,
        isPrivate: true,
      },
    ],
  },
]