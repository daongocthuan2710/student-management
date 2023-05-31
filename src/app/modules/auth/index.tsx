import React from "react";
import { Button, Spin, Form, Input, Checkbox } from "antd";
import { authActions, selectIslogging } from "./slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { LoginBlockWrapper} from "./styled";
import { FormCustom } from "../styled";
export interface LoginProps {}

export function Login(props: LoginProps) {
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectIslogging);
  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: "",
        password: "",
      })
    );
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <LoginBlockWrapper>
        <FormCustom
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" onClick={handleLoginClick}>
              {isLogging && <Spin className="b" />} Login
            </Button>
          </Form.Item>
        </FormCustom>
      </LoginBlockWrapper>
    </>
  );
}
