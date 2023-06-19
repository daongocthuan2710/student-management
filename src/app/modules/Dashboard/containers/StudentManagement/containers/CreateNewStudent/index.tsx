// Libs
import React from "react";

// Ant
import { Button, Form, Input, InputNumber, Radio, Select, Spin } from "antd";

// Hooks
import { useCreateStudent } from "../../../../../../queries/Student/useCreateStudent";

// Types
import { TCreateStudent } from "../../../../../../models";

// Styled
import { CenterBlock, FormCustom } from "../../../../../styled";
import { useGetListCities } from "../../../../../../queries/Student/useGetCities";

export default function CreateNewStudent() {
  // Get List Cities
  const { data: cities } = useGetListCities();
  const cityList = cities?.data || [];
  const { mutate, isLoading } = useCreateStudent();

  const onFinish = (values: unknown) => {
    const data: TCreateStudent = values as TCreateStudent;
    mutate(data);

    // dispatch({ type: ACTIONS.CREATE_NEW_STUDENT, payload: data });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <CenterBlock>
        <h1 className="_title">Create New Student</h1>
        <FormCustom
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          initialValues={{ remember: true }}
          onFinish={(values) => onFinish(values)}
          onFinishFailed={() => onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please choose the gender!" }]}
          >
            <Radio.Group>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            initialValue="hcm"
            rules={[{ required: true, message: "Please choose the city!" }]}
          >
            <Select>
              {cityList.length > 0
                ? cityList.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))
                : ""}
            </Select>
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input the age!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Mark"
            name="mark"
            rules={[{ required: true, message: "Please input the mark!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              {isLoading && (
                <>
                  <Spin /> &ensp;
                </>
              )}{" "}
              Create New
            </Button>
          </Form.Item>
        </FormCustom>
      </CenterBlock>
    </>
  );
}
