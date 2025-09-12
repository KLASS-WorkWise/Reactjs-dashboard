import { DatabaseOutlined, MessageOutlined, } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import ChatPage from "./ChatPage";



export const routesChat: RouteItem[] = [
    {
        path: '/chat',
        label: <span style={{ fontSize: 18, fontWeight: 'bold' }}>Chat</span>,
        key: 'chat',
        icon: <MessageOutlined style={{ fontSize: 21, color: '#66789c' }} />,
        element: <ChatPage />,
        isShowMenu: true,
        isPrivate: true,
    },
]