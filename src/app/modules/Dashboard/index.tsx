// Libraries
import * as React from "react";
import { Link, Redirect, Switch } from "react-router-dom";

// Hooks
import { useAppDispatch } from "../../hooks/hooks";

// Slices
import { authActions } from "../auth/slice";

// Antd
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";

// Components
import PrivateRoute from "../../components/common/PrivateRoute";

// Constants
import dashboardRoutes from "./routes";
import { DashboardHeader } from "./styled";
import BreadcrumbCustom from "../../components/Breadcrumb";

const { Content, Footer, Sider } = Layout;

const navItems: MenuProps["items"] = dashboardRoutes.map((route) => ({
  key: route.name,
  label: <Link to={`${route.path}`}>{route.name}</Link>,
}));

const subnavItems: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
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
});

export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useAppDispatch();
  return (
    <Layout>
      <DashboardHeader>
        <div className="_title">
          <h1>
            <Link to="/">Student Management</Link>
          </h1>
          <Menu
            style={{ marginLeft: "15px" }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={navItems}
          />
        </div>
        <Button style={{}} onClick={() => dispatch(authActions.logout())}>
          Logout
        </Button>
      </DashboardHeader>
      <Content style={{ padding: "0 50px" }}>
        <BreadcrumbCustom />
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={subnavItems}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Switch>
              {dashboardRoutes.map((route) => {
                const { exact, path, component, key } = route;
                return (
                  <PrivateRoute
                    key={key}
                    path={path}
                    exact={exact}
                    component={component}
                  />
                );
              })}
              <Redirect to={"/dashboard"} />
            </Switch>
          </Content>
        </Layout>
      </Content>
      {/* <Footer style={{ textAlign: "center", marginTop: "10px" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer> */}
    </Layout>
  );
}
