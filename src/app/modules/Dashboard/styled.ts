import { Layout } from "antd";
import styled from "styled-components";

const { Header } = Layout;

export const DashboardHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & ._title {
    display: flex;
    align-items: center;
  }

  & h1 {
    & a {
      color: white !important;
    }
  }
`;
