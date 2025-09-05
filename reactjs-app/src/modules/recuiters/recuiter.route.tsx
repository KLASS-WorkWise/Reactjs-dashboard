import { DatabaseOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import RecuiterPage from "./RecuiterPage";



export const routesRecuiter: RouteItem[] = [
    {
        path: '/recuiter',
        label: <span style={{ fontSize: 18, fontWeight: 'bold' }}>Recuiters</span>,
        key: 'recuiter',
        icon: <DatabaseOutlined style={{ fontSize: 21, color: '#66789c' }} />,
        element: <RecuiterPage />,
        isShowMenu: true,
        isPrivate: true,
    },
]