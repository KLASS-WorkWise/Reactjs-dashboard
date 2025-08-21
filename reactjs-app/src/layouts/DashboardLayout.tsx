import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Menu } from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import { routes, type RouteItem } from '../routes';
import { Layout, Menu as AntMenu, Button, theme, message } from 'antd';
import { useNavigate, Outlet, Link } from "react-router";

import { useAuthStore } from '../stores/useAuthorStore';

const { Header, Sider, Content, Footer } = Layout;

import type { MenuProps } from 'antd';
import { useAppMessage } from '../stores/useAppMessage';
import CustomHeader from "./Header";


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

const items = mapRoutesToMenuItems(routes);

const DefaultLayout: React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const { msg, type, clearMessage } = useAppMessage();

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

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // logout 
  const { loggedInUser, logOut } = useAuthStore();
  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  // Dropdown menu cho avatar
  const avatarMenu = (
    <Menu>
      <Menu.Item key="logout" danger onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

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
        <Sider trigger={null} collapsible collapsed={collapsed}
          style={{
            position: "fixed",
            top: 64, // đúng bằng chiều cao header
            left: 0,
            height: "calc(100vh - 64px)",
            background: "#fff",
            zIndex: 10,
            overflow: "auto",
          }}
        >
          {/* <div className="sidebar_logo">{collapsed ? 'A' : 'Admin'}</div> */}

          <AntMenu
            theme="light"
            mode="inline"
            items={items}
            onClick={({ key }) => {
              navigate('/' + key.split('-').join('/'));
              console.log(key);
            }}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? '80px' : '200px' }}>


          <Content
            style={{
              margin: '16px',
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              overflow: 'initial'
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DefaultLayout;