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
  import React, { useEffect } from 'react';
  import { useAppDispatch, useAppSelector } from '../../app/hooks';
  import { Student } from '../../models';
  import { ACTIONS } from './sagaActions';
import { useParams } from 'react-router-dom';
import { selectStudentGetLoading, selectStudentUpdate, selectStudentUpdateLoading, } from './studentSlice';
  
  const { TextArea } = Input;
  
  export default function EditStudent(){
    const dispatch = useAppDispatch()
    const getLoading = useAppSelector(selectStudentGetLoading)
    const updateLoading = useAppSelector(selectStudentUpdateLoading)
    
    const {id} = useParams<{ id: string }>();
    const student = useAppSelector(selectStudentUpdate);

    useEffect(()=>{
      dispatch({type:ACTIONS.FETCH_STUDENT_BY_ID, payload: id})     
    }, [dispatch, id]);

    const handleEditStudent = () =>{
      const student = {
        id: id,
        data:{
          name: "new update"
        }
      }
      dispatch({type: ACTIONS.UPDATE_STUDENT, payload: student})
    }
    return (
      <>
      {getLoading
      ?
      <div style={{height:'40vh' ,display: 'flex', alignItems: 'center', justifyContent:'center'}}>
        <Spin/> 
      </div>
      :<div style={{maxWidth: 600}}>
          <h1 style={{textAlign: 'center'}}>Edit Student</h1>
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
              <Input value={student.name}/>
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
              <Button onClick={() => handleEditStudent()} disabled={updateLoading}>
                {updateLoading && <><Spin /> &ensp;</> }Edit Now
              </Button>
            </Form.Item>
          </Form>
        </div>}    
      </>
    );
  };
  