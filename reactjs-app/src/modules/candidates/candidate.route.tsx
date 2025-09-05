import { DatabaseOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import CandidatePage from "./CandidatePage";



export const routesCandidate: RouteItem[] = [
    {
        path: '/candidate',
        label: <span style={{ fontSize: 18, fontWeight: 'bold' }}>Candidates</span>,
        key: 'candidate',
        icon: <DatabaseOutlined style={{ fontSize: 21, color: '#66789c' }} />,
        element: <CandidatePage />,
        isShowMenu: true,
        isPrivate: true,
    },
]