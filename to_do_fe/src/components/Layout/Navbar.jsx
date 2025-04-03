import { Layout, Menu, Button } from "antd";
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Header } = Layout;

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/") return "1";
    if (path === "/tasks") return "2";
    return "0";
  };

  return (
    <Header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ color: "white", margin: 0, marginRight: 30 }}>
            Task Manager
          </h2>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[getSelectedKey()]}
            style={{ flex: 1, minWidth: 200 }}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            {isAuthenticated && (
              <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                <Link to="/tasks">Tasks</Link>
              </Menu.Item>
            )}
          </Menu>
        </div>

        <div>
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
  );
};

export default Navbar;
