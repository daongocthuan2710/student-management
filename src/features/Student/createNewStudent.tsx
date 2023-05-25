import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Spin,
  Switch,
} from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Student } from '../../models';
import { ACTIONS } from './sagaActions';
import { selectStudentCreateLoading } from './studentSlice';

const { TextArea } = Input;

export default function CreateNewStudent(){
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectStudentCreateLoading);

  const handleCreateNewStudent = () =>{
    const data: Student = {
      name: "thua33",
      age: 18, 
      mark: 9,
      gender: 'male',
      city: 'hn', 
    }
    dispatch({type: ACTIONS.CREATE_NEW_STUDENT, payload: data})
  }
  return (
    <>
    <div style={{maxWidth: 600}}>
      <h1 style={{textAlign: 'center'}}>Create New Student</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="Gender">
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="City">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Status" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item style={{textAlign: 'center', width: '100%'}}>
          <Button onClick={() => handleCreateNewStudent()} disabled={loading}>
            {loading && <><Spin /> &ensp;</> } Create New
            </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};
