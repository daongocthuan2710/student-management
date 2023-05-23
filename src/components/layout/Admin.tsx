import * as React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/auth/authSlice';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from '../../features/Dashboard';
import { Student } from '../../features/Student';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['Dashboard', 'Student', '3'].map((key) => ({
  key,
  label: `${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

export interface AdminProps {
}

export function Admin (props: AdminProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useAppDispatch();
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <h1 style={{color: 'white'}}>Student Management</h1>
          <Menu style={{marginLeft:'15px'}} theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </div>
        <Button style={{}} onClick={() => dispatch(authActions.logout())}>Logout</Button>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Switch>
              <Route path='/admin/dashboard'>
                <Dashboard />
              </Route>
              <Route path='/admin/students'>
                <Student />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
}
