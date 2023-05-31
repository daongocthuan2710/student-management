import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { push } from "connected-react-router";

// Antd
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Spin,
  message,
} from "antd";

// Hooks
import { useAppDispatch } from "../../../../../../hooks/hooks";
import { useUpdateStudent } from "../../hooks/useUpdateStudent";
import { useGetStudent } from "../../hooks/useGetStudent";
import { useGetListCities } from "../../hooks/useGetListCities";

// Constants
import { ACTIONS } from "../../slice/sagaActions";
import { MESSAGE } from "../../../../../../../constants";
import { ROUTES } from "../../../../../../../constants/routes";

// Styled
import { FormCustom, CenterBlock } from "../../../../../styled";

// Types
import { TUpdateStudent } from "./type";
import { Student } from "../../../../../../models";

export default function UpdateStudentInfo() {
  const dispatch = useAppDispatch();
  // Get List Cities
  const { data: cities } = useGetListCities();
  const cityList = cities?.data || [];

  // Get student Info
  const { id } = useParams<{ id: string }>();
  const { data: student = new Student({}), isLoading: getLoading } =
    useGetStudent({ id });

  const { mutate, isLoading, isError, isSuccess } = useUpdateStudent();

  if (isSuccess) {
    message.success(MESSAGE.UPDATE_SUCCESS, MESSAGE.DURATION);
    dispatch(push(ROUTES.STUDENT.path));
  }

  if (isError) {
    message.success(MESSAGE.UPDATE_FAILED, MESSAGE.DURATION);
  }

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
      {getLoading && student === undefined ? (
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
                Edit Now
              </Button>
            </Form.Item>
          </FormCustom>
        </CenterBlock>
      )}
    </>
  );
}
