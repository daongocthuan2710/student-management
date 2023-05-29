import { Button, Form, Input, InputNumber, Radio, Select, Spin } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks";
import { Student } from "../../../../../../models";
import { ACTIONS } from "../../slice/sagaActions";
import { selectCityList, selectStudentCreateLoading } from "../../slice";

export default function CreateNewStudent() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectStudentCreateLoading);
  const { data: cityList } = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_CITY_DATA });
  }, [dispatch]);

  const onFinish = (values: Student) => {
    const data: Student = {
      name: values.name,
      age: values.age,
      mark: values.mark,
      gender: values.gender,
      city: values.city,
      id: values.id,
      tags: values.tags,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
      model: values.model,
    };
    dispatch({ type: ACTIONS.CREATE_NEW_STUDENT, payload: data });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div style={{ maxWidth: 600 }}>
        <h1 style={{ textAlign: "center" }}>Create New Student</h1>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            initialValue="Hồ Chí Minh"
            rules={[{ required: true, message: "Please choose the city!" }]}
          >
            <Select>
            {cityList.length > 0 ?
            cityList.map((item) => (
              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
            )) : ''}    
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading && (
                <>
                  <Spin /> &ensp;
                </>
              )}{" "}
              Create New
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
