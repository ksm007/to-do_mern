import { Layout, Menu, Button, Drawer } from "antd";
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const { Header } = Layout;

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/") return "1";
    if (path === "/tasks") return "2";
    return "0";
  };

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    ...(isAuthenticated
      ? [
          {
            key: "2",
            icon: <UnorderedListOutlined />,
            label: <Link to="/tasks">Tasks</Link>,
          },
        ]
      : []),
  ];

  return (
    <>
      <Header style={{ paddingInline: 20 }}>
        <div
          className="navbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="navbar-left"
            style={{ display: "flex", alignItems: "center", gap: 20 }}
          >
            <h2 style={{ color: "white", margin: 0 }}>Task Manager</h2>

            {/* Desktop Menu */}
            <div className="desktop-menu" style={{ display: "none" }}>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[getSelectedKey()]}
                items={menuItems}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            className="menu-button"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileOpen(true)}
            style={{ color: "white", display: "none" }}
          />

          <div className="auth-action">
            {isAuthenticated ? (
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={logout}
                style={{ color: "white" }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button type="primary" icon={<UserOutlined />}>
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Header>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Task Manager"
        placement="left"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
      >
        <Menu
          mode="vertical"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          onClick={() => setMobileOpen(false)}
        />
      </Drawer>

      {/* Responsive CSS */}
      <style>
        {`
          @media (min-width: 768px) {
            .desktop-menu {
              display: block !important;
            }
            .menu-button {
              display: none !important;
            }
          }

          @media (max-width: 767px) {
            .menu-button {
              display: inline-block !important;
            }
            .desktop-menu {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
