import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import EmptyLayout from './layouts/EmptyLayout';
import { routes, type RouteItem } from './routes';
import { useAuthStore } from './stores/useAuthorStore';
import NotFoundPage from './modules/notfound/NotFoundPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

// Đệ quy sinh route từ mảng routes
function renderRoutes(routes: RouteItem[], parentIsPrivate = false) {
  // Dùng hook để luôn lấy trạng thái mới nhất
  const { loggedInUser } = useAuthStore();
  return routes.map((route) => {
    const isPrivate = route.isPrivate || parentIsPrivate;
    const Layout = isPrivate ? DashboardLayout : EmptyLayout;
    if (isPrivate && !loggedInUser) {
      return (
        <Route key={route.key} path={route.path || ''} element={<NotFoundPage />} />
      );
    }
    if (route.children && route.children.length > 0) {
      return (
        <Route key={route.key} path={route.path || ''} element={<Layout />}>
          {route.element && <Route index element={route.element} />}
          {route.children.map(child =>
            child.children && child.children.length > 0
              ? renderRoutes([child], isPrivate)
              : <Route key={child.key} path={child.path || ''} element={child.element || <div>{child.label} Page</div>} />
          )}
        </Route>
      );
    }
    return (
      <Route key={route.key} path={route.path || ''} element={<Layout />}>
        {route.element && <Route index element={route.element} />}
      </Route>
    );
  });
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Chuyển hướng từ / về /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {renderRoutes(routes)}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
