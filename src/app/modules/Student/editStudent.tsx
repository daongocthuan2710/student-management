import { Button, Form, Input, InputNumber, Radio, Select, Spin } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ACTIONS } from "./sagaActions";
import { useParams } from "react-router-dom";
import {
  selectCityList,
  selectStudentGetLoading,
  selectStudentUpdate,
  selectStudentUpdateLoading,
} from "./studentSlice";

export default function EditStudent() {
  const dispatch = useAppDispatch();
  const getLoading = useAppSelector(selectStudentGetLoading);
  const updateLoading = useAppSelector(selectStudentUpdateLoading);
  const { data: cityList } = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_CITY_DATA });
  }, [dispatch]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const student = {
      id: id,
      data: values,
    };

    dispatch({ type: ACTIONS.UPDATE_STUDENT, payload: student });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { id } = useParams<{ id: string }>();
  const student = useAppSelector(selectStudentUpdate);

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_STUDENT_BY_ID, payload: { id: id } });
  }, [dispatch, id]);

  return (
    <>
      {getLoading ? (
        <div
          style={{
            height: "40vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <div style={{ maxWidth: 600 }}>
          <h1 style={{ textAlign: "center" }}>Edit Student</h1>
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
              initialValue={student.gender}
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
              initialValue={student.name}
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              initialValue={student.city}
              rules={[{ required: true, message: "Please choose the city!" }]}
            >
              {/* <Select>
                {cityList.length > 0 ?
                cityList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                )) : ''}    
              </Select> */}
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              initialValue={student.age}
              rules={[{ required: true, message: "Please input the age!" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Mark"
              name="mark"
              initialValue={student.mark}
              rules={[{ required: true, message: "Please input the mark!" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" disabled={updateLoading}>
                {updateLoading && (
                  <>
                    <Spin /> &ensp;
                  </>
                )}{" "}
                Edit Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}
