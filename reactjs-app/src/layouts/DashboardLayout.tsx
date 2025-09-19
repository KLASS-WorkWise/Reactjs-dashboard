// <<<<<<< HEAD
// import React, { useEffect, useState } from "react";
// import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

// import { routes, type RouteItem } from "../routes";
// import { Layout, Menu, Button, theme, message } from "antd";

// import "../styles/sidebar-custom.css";
// import { useNavigate, Outlet } from "react-router";

// const { Header, Sider, Content, Footer } = Layout;

// import type { MenuProps } from "antd";
// import { useAppMessage } from "../stores/useAppMessage";
// import CustomHeader from "./Header";
// type MenuItem = Required<MenuProps>["items"][number];
// =======
// import React, { useEffect, useState } from 'react';
// import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// import { Layout, Menu, Button, theme, message } from 'antd';
// import type { MenuProps } from 'antd';
// import { useNavigate, Outlet } from "react-router";

// import { routes, type RouteItem } from '../routes';
// import { useAuthStore } from '../stores/useAuthorStore';
// import { useAppMessage } from '../stores/useAppMessage';
// import CustomHeader from './Header';

// import '../styles/sidebar-custom.css';

// const { Header, Sider, Content, Footer } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];
// >>>>>>> origin/dev

// /**
//  * Lọc menu theo role user và chuyển đổi sang items của Antd Menu
//  */
// function mapRoutesToMenuItems(routes: RouteItem[], userRoles: string[]): MenuItem[] {
//   return routes
// <<<<<<< HEAD
//     .filter((route) => route.isShowMenu)
// =======
//     .filter(
//       (route) =>
//         route.isShowMenu &&
//         (!route.roles || route.roles.some((role) => userRoles.includes(role)))
//     )
// >>>>>>> origin/dev
//     .map((route) => {
//       const item: MenuItem = {
//         label: route.label,
//         key: route.key,
//         icon: route.icon ?? null,
//         children: route.children
// <<<<<<< HEAD
//           ? mapRoutesToMenuItems(route.children)
// =======
//           ? mapRoutesToMenuItems(route.children, userRoles)
// >>>>>>> origin/dev
//           : undefined,
//       };
//       return item;
//     });
// }

// const DefaultLayout: React.FC = () => {
// <<<<<<< HEAD
// =======
//   const userRoles = useAuthStore((state) => state.loggedInUser?.roles || []);
//   const loading = useAuthStore((state) => state.loading);
//   // Nếu đang loading hoặc chưa có role thì render loading
//   if (loading || !userRoles.length) {
//     return <div style={{padding: 40, textAlign: 'center'}}>Loading...</div>;
//   }
//   const items = mapRoutesToMenuItems(routes, userRoles);

//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();

// >>>>>>> origin/dev
//   const [messageApi, contextHolder] = message.useMessage();
//   const { msg, type, clearMessage } = useAppMessage();

//   useEffect(() => {
//     if (msg) {
//       messageApi.info({
//         content: msg,
//         type: type,
//         duration: 3,
//         onClose: () => clearMessage(),
//       });
//     }
//   }, [msg, type, messageApi, clearMessage]);

// <<<<<<< HEAD
//   const navigate = useNavigate();

//   const [collapsed, setCollapsed] = useState(false);
// =======
// >>>>>>> origin/dev
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   // Lấy role và trạng thái loading từ store

//   return (
//     <>
//       {contextHolder}
//       <CustomHeader />

//       {/* Nút toggle Sidebar */}
//       <Button
//         type="text"
//         icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//         onClick={() => setCollapsed(!collapsed)}
//         style={{
//           position: "fixed",
//           top: 12,
//           left: collapsed ? 12 : 250,
//           zIndex: 101,
//           fontSize: "20px",
//           width: 40,
//           height: 40,
//           background: "#fff",
//           boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
//           borderRadius: "50%",
//         }}
//       />
// <<<<<<< HEAD
//       <Layout hasSider style={{ minHeight: "100vh" }}>
// =======

//       <Layout hasSider style={{ minHeight: "100vh" }}>
//         {/* Sidebar */}
// >>>>>>> origin/dev
//         <Sider
//           trigger={null}
//           collapsible
//           collapsed={collapsed}
// <<<<<<< HEAD
//           width={240} // tăng chiều rộng sidebar
// =======
//           width={240}
// >>>>>>> origin/dev
//           collapsedWidth={80}
//           style={{
//             position: "fixed",
//             top: 64, // đúng bằng chiều cao header
//             left: 0,
//             background: "#fff",
//             overflow: "auto",
// <<<<<<< HEAD
//             height: "calc(100vh - 64px)", // trừ đi chiều cao header
// =======
//             height: "100vh",
// >>>>>>> origin/dev
//           }}
//         >
//           <Menu
//             theme="light"
//             mode="inline"
//             items={items}
//             onClick={({ key }) => {
//               navigate("/" + key.split("-").join("/"));
// <<<<<<< HEAD
//               console.log(key);
//             }}
//           />
//         </Sider>
// =======
//             }}
//           />
//         </Sider>

//         {/* Nội dung chính */}
// >>>>>>> origin/dev
//         <Layout
//           style={{
//             marginLeft: collapsed ? "80px" : "240px",
//             transition: "margin-left 0.2s",
//           }}
//         >
// <<<<<<< HEAD
//           {" "}
//           {/* tùy chỉnh kích thước phần nội dung dưới header ( dashboard...)  */}
// =======
// >>>>>>> origin/dev
//           <Header
//             style={{
//               padding: 0,
//               background: colorBgContainer,
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//             }}
//             className="drop-shadow-sm"
// <<<<<<< HEAD
//           ></Header>
// =======
//           />

// >>>>>>> origin/dev
//           <Content
//             style={{
//               margin: "16px",
//               padding: 16,
//               minHeight: 280,
//               background: colorBgContainer,
//               overflow: "initial",
//             }}
//           >
//             <Outlet />
//           </Content>
// <<<<<<< HEAD
// =======

// >>>>>>> origin/dev
//           <Footer style={{ textAlign: "center" }}>
//             Ant Design ©2023 Created by Ant UED
//           </Footer>
//         </Layout>
//       </Layout>
//     </>
//   );
// };

// export default DefaultLayout;

import React, { useEffect, useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, message } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, Outlet } from "react-router";

import { routes, type RouteItem } from "../routes";
import { useAuthStore } from "../stores/useAuthorStore";
import { useAppMessage } from "../stores/useAppMessage";
import CustomHeader from "./Header";

import "../styles/sidebar-custom.css";

const { Header, Sider, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

/**
 * Lọc menu theo role user và chuyển đổi sang items của Antd Menu
 */
function mapRoutesToMenuItems(routes: RouteItem[], userRoles: string[]): MenuItem[] {
  return routes
    .filter(
      (route) =>
        route.isShowMenu &&
        (!route.roles || route.roles.some((role) => userRoles.includes(role)))
    )
    .map((route) => {
      const item: MenuItem = {
        label: route.label,
        key: route.key,
        icon: route.icon ?? null,
        children: route.children
          ? mapRoutesToMenuItems(route.children, userRoles)
          : undefined,
      };
      return item;
    });
}

const DefaultLayout: React.FC = () => {
  const userRoles = useAuthStore((state) => state.loggedInUser?.roles || []);
  const loading = useAuthStore((state) => state.loading);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  
  const [messageApi, contextHolder] = message.useMessage();
  const { msg, type, clearMessage } = useAppMessage();

  // Gọi hook trước khi render return
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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Nếu đang loading hoặc chưa có role thì render loading
  if (loading || !userRoles.length) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  }

  const items = mapRoutesToMenuItems(routes, userRoles);

  return (
    <>
      {contextHolder}
      <CustomHeader />

      {/* Nút toggle Sidebar */}
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "fixed",
          top: 12,
          left: collapsed ? 12 : 250,
          zIndex: 101,
          fontSize: "20px",
          width: 40,
          height: 40,
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          borderRadius: "50%",
        }}
      />

      <Layout hasSider style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
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
              navigate("/" + key.split("-").join("/"));
            }}
          />
        </Sider>

        {/* Nội dung chính */}
        <Layout
          style={{
            marginLeft: collapsed ? "80px" : "240px",
            transition: "margin-left 0.2s",
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
            className="drop-shadow-sm"
          />
          <Content
            style={{
              margin: "16px",
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              overflow: "initial",
            }}
          >
            <Outlet />
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DefaultLayout;
