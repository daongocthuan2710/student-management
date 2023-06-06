import { Form } from "antd";
import styled from "styled-components";

export const CenterBlock = styled.div<{ $maxWidth?: number }>`
  margin: auto;
  max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : 600)}px;

  & ._title {
    font-size: 20px;
    text-align: center;
    color: #857b7b;
  }
`;

export const FormCustom = styled(Form)<{ $maxWidth?: string | number }>`
  background-color: white;
  padding: 15px;
  border-radius: 15px;
  max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : 500)}px;
  margin: 0 auto;
`;
