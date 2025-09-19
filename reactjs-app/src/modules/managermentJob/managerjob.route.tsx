import { FileSearchOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import ManagerJobPage from "./ManagerJobPage";

export const routesManagerJob: RouteItem[] = [
	{
		path: '/managerjob',
		label: <span style={{ fontSize: 18, fontWeight: 'bold' }}>Quản lý Job</span>,
		key: 'managerjob',
		icon: <FileSearchOutlined style={{ fontSize: 22, color: '#66789c' }} />,
		element: <ManagerJobPage />,
		isShowMenu: true,
		isPrivate: true,
		roles: ["Administrators"],
	},
];
