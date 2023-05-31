import { Button, Form, Input, InputNumber, Radio, Select, Spin } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks";
import { ACTIONS } from "../../slice/sagaActions";
import { useParams } from "react-router-dom";
import {
  selectCityList,
  selectStudentGetLoading,
  selectStudentUpdate,
  selectStudentUpdateLoading,
} from "../../slice";
import { FormCustom, CenterBlock } from "../../../../../styled";

export default function UpdateStudentInfo() {
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
        <CenterBlock>
          <Spin />
        </CenterBlock>
      ) : (
        <CenterBlock>
          <h1 className="_title">Edit Student</h1>
          <FormCustom
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
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
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit" disabled={updateLoading}>
                {updateLoading && (
                  <>
                    <Spin /> &ensp;
                  </>
                )}{" "}
                Edit Now
              </Button>
            </Form.Item>
          </FormCustom>
        </CenterBlock>
      )}
    </>
  );
}
