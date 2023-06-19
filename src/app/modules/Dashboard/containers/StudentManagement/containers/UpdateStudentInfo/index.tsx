import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Antd
import { Button, Form, Input, InputNumber, Radio, Select, Spin } from "antd";

// Hooks
import { useAppDispatch } from "../../../../../../hooks/hooks";
import { useUpdateStudent } from "../../../../../../queries/Student/useUpdateStudent";
import { useGetStudent } from "../../../../../../queries/Student/useGetStudent";
import { useGetListCities } from "../../../../../../queries/Student/useGetCities";

// Constants
import { ACTIONS } from "../../slice/sagaActions";

// Styled
import { FormCustom, CenterBlock } from "../../../../../styled";

// Types
import { TUpdateStudent } from "./type";
import { Student } from "../../../../../../models";
import { push } from "connected-react-router";
import { ROUTES } from "../../../../../../../constants/routes";

export default function UpdateStudentInfo() {
  const dispatch = useAppDispatch();
  // Get List Cities
  const { data: cities } = useGetListCities();
  const cityList = cities?.data || [];

  // Get student Info
  const { id } = useParams<{ id: string }>();
  const { data: student = new Student({}), isLoading: getLoading } =
    useGetStudent({ id });

  const { mutate, isLoading, variables } = useUpdateStudent();
  console.log("variables: ", variables);

  const onFinish = (values: any) => {
    const oldStudent: TUpdateStudent = {
      id: id,
      data: values,
    };
    mutate(oldStudent);
    // dispatch({ type: ACTIONS.UPDATE_STUDENT, payload: oldStudent });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_CITY_DATA });
    // dispatch({ type: ACTIONS.FETCH_STUDENT_BY_ID, payload: { id: id } });
  }, [dispatch]);

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
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                {isLoading && (
                  <>
                    <Spin /> &ensp;
                  </>
                )}{" "}
                Update Now
              </Button>
            </Form.Item>
          </FormCustom>
        </CenterBlock>
      )}
    </>
  );
}
