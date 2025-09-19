import { DatabaseOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import CandidatesApplyPage from "../candidatesApply/CadidatesApplyPage";



export const routesCandidate: RouteItem[] = [
    {
        path: '/candidate',
        label: <span style={{ fontSize: 18, fontWeight: 'bold' }}>Candidates</span>,
        key: 'candidate',
        icon: <DatabaseOutlined style={{ fontSize: 21, color: '#66789c' }} />,
        element: <CandidatesApplyPage />,
        isShowMenu: true,
        isPrivate: true,
        roles : ["Employers"], // hoặc ["Employers"]
    },
]