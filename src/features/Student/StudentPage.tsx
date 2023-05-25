/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// Slice
import { selectStudentDeleteLoading, selectStudentList, selectStudentListLoading} from './studentSlice';

// Ant Libs
import { Modal, Space, Spin, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Student } from '../../models';
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ACTIONS } from './sagaActions';

export interface StudentProps {
}

function StudentPage (props: StudentProps) {
  const dispatch = useAppDispatch()
  const [modal, contextHolder] = Modal.useModal();
  const listedLoading = useAppSelector(selectStudentListLoading)
  const deletedLoading = useAppSelector(selectStudentDeleteLoading)
  const {data, pagination} = useAppSelector(selectStudentList)

  const columns: ColumnsType<Student> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Mark',
      dataIndex: 'mark',
      key: 'mark',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Modified At',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags !== undefined
          ?
          tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          }) : ''}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, {id}) => (
        <Space size="middle">
          <Link to={ `/admin/students/edit-student/${id}`}>Edit <EditOutlined /></Link>
          {deletedLoading ? <Spin /> : <a onClick={() => handleRemoveStudent(id)}>Delete <DeleteOutlined /></a>}
        </Space> 
      ),
    },
  ];

  const handleRemoveStudent = (id: string | undefined) => {
    const config = {
      title: 'Are you sure!',
      content: (
        <></>
      ),
      onOk() {
        dispatch({type:ACTIONS.DELETE_STUDENT, payload: id})
      },
    };
    modal.confirm(config);
  }

  const handleFetchData = (page: number, pageSize: number) => {
    dispatch({type:ACTIONS.FETCH_STUDENT_DATA, payload: {page: page, limit: pageSize}})
  }

  const studentList: Student[] = data.map((item, index) => {
      return {
        key: index,
        id: item.id,
        name: item.name,
        age: item.age,
        mark: item.mark,
        gender: item.gender,
        city: item.city,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
        tags: ['nice', 'developer'],
      }
  })
  
  useEffect(()=>{
    dispatch(()=>{
      dispatch({type:ACTIONS.FETCH_STUDENT_DATA, payload:{}})
    })
  }, [dispatch])

  return (
    <>
      {listedLoading ? 
      <div style={{height:'40vh' ,display: 'flex', alignItems: 'center', justifyContent:'center'}}>
        <Spin/> 
      </div>
      : <>
        <div style={{padding: '15px'}}>
          <Link to='/admin/students/create-new-student' style={{fontSize:'25px'}}>
            <UserAddOutlined />
          </Link>
        </div>
        <Table 
          columns={columns} 
          dataSource={studentList}
          loading={listedLoading}
          pagination={{ 
            pageSize: pagination._limit,
            current: pagination._page,
            position: ['bottomCenter'],
            total: pagination._totalRows,
            showSizeChanger: true,
            onChange: (current, pageSize) => handleFetchData(current, pageSize),
          }}
        />
      </>}
      {contextHolder}
    </>
  );
}

export default StudentPage;