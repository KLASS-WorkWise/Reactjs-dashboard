import React, { useEffect, useState } from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import { routes, type RouteItem } from '../routes';
import { Layout, Menu, Button, theme, message } from 'antd';

import '../styles/sidebar-custom.css';
import { useNavigate, Outlet } from "react-router";

import type { MenuProps } from 'antd';
import { useAppMessage } from '../stores/useAppMessage';
import CustomHeader from './Header';

const { Header, Sider, Content, Footer } = Layout;

function getUserRole() {
  return (localStorage.getItem('userRole') || '').trim().toLowerCase();
}

type MenuItem = Required<MenuProps>['items'][number];

// Chuyển đổi mảng routes sang định dạng items của Antd Menu
function mapRoutesToMenuItems(routes: RouteItem[]): MenuItem[] {
  return routes
    .filter(route => route.isShowMenu)
    .map(route => {
      const item: MenuItem = {
        label: route.label,
        key: route.key,
        icon: route.icon ?? null,
        children: route.children ? mapRoutesToMenuItems(route.children) : undefined,
      };
      return item;
    });
}

const DefaultLayout: React.FC = () => {
  const [userRole, setUserRole] = useState(getUserRole());
  const [menuRoutes, setMenuRoutes] = useState<RouteItem[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { msg, type, clearMessage } = useAppMessage();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Lắng nghe thay đổi role trong localStorage và cập nhật menu
  useEffect(() => {
    const handleStorage = () => {
      const role = getUserRole();
      setUserRole(role);
    };

    window.addEventListener('storage', handleStorage);

    const updateMenu = () => {
      const role = getUserRole();
      const filtered = routes.filter(route => {
        const routeRoles = route.roles ? route.roles.map(r => r.trim().toLowerCase()) : [];
        const match = !route.roles || routeRoles.includes(role);
        if (route.isShowMenu) {
          console.log('Route:', route.key, '| Roles:', routeRoles, '| isShowMenu:', route.isShowMenu, '| Match:', match);
        }
        return match;
      });
      setMenuRoutes(filtered);
    };

    updateMenu();

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [userRole]);

  // Lắng nghe tin nhắn từ store
  useEffect(() => {
    if (msg) {
      messageApi.info({
        content: msg,
        type: type,
        duration: 3,
        onClose: () => clearMessage(),
      });
    }
  }, [msg, type, messageApi, clearMessage]);

  const items = mapRoutesToMenuItems(menuRoutes);

  return (
    <>
      {contextHolder}
      <CustomHeader />
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "fixed",
          top: 12,
          left: collapsed ? 12 : 250,
          zIndex: 101,
          fontSize: '20px',
          width: 40,
          height: 40,
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          borderRadius: "50%",
        }}
      />
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
          collapsedWidth={80}
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            background: "#fff",
            overflow: "auto",
            height: "100vh",
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            items={items}
            onClick={({ key }) => {
              navigate('/' + key.split('-').join('/'));
              console.log(key);
            }}
          />
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? '80px' : '240px',
            transition: 'margin-left 0.2s',
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}
            className='drop-shadow-sm'
          />
          <Content
            style={{
              margin: '16px',
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              overflow: 'initial',
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DefaultLayout;
