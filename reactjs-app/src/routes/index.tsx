import type { ReactNode } from 'react';
import { routesDashboard } from '../modules/dashboard/dashboard.route';
import { routesAuth } from '../modules/auth/auth.route';
// import { routesProduct } from '../modules/product/product.route';
// import { routesAdministrator } from '../modules/administrator/administrator.route';
import { routesEmployer } from '../modules/employer/empoyer.route';
import { routesUser } from '../modules/user/user.route';
import { routesRecuiter } from '../modules/recuiters/recuiter.route';
import { routesCandidate } from '../modules/candidates/candidate.route';
import { routesChat } from '../modules/Chat/chat.route';
import { routesjobPosting } from '../modules/jobposting/jobposting.route';

export type RouteItem = {
  path?: string;
  label: React.ReactNode;
  key: string;
  icon?: ReactNode;
  element?: React.ReactNode | null;
  children?: RouteItem[];
  isShowMenu: boolean; // Thêm thuộc tính này để xác định có hiển thị menu hay không
  isPrivate: boolean; // Thêm thuộc tính này để xác định có phải là route riêng tư hay không
};

export const routes: RouteItem[] = [
  ...routesDashboard, //đăng ký route dashboard
  ...routesAuth,
  // ...routesProduct,
  // ...routesAdministrator,
  ...routesEmployer, //đăng ký route employer
  ...routesUser,
  ...routesRecuiter,
  ...routesCandidate,
  ...routesChat,
  ...routesjobPosting
];
