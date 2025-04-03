import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const { Content, Footer } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ padding: '24px 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Task Manager ©{new Date().getFullYear()} Created with React, Vite & Ant Design
      </Footer>
    </Layout>
  );
};

export default AppLayout;