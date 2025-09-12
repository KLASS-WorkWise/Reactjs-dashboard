import { FileTextOutlined } from '@ant-design/icons';
import type { RouteItem } from '../../routes';
import SystemLogsPage from './SystemLogsPage';

export const routesSystemLogs: RouteItem[] = [
    {
        path: '/systemlogs',
        label: <span style={{ fontSize: 18, fontWeight: 'bold' }}>System Logs</span>,
        key: 'systemlogs',
        icon: <FileTextOutlined style={{ fontSize: 22, color: '#66789c' }} />,
        element: <SystemLogsPage />,
        isShowMenu: true,
        isPrivate: true,
        roles: ['administrators'],
    },
];
