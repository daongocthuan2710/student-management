/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

// Slice
import {
  selectStudentDeleteLoading,
  selectStudentList,
  selectStudentListLoading,
} from "./studentSlice";

// Ant Libs
import { Modal, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Student } from "../../models";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ACTIONS } from "./sagaActions";

export interface StudentProps {}

function StudentPage(props: StudentProps) {
  const dispatch = useAppDispatch();
  const listedLoading = useAppSelector(selectStudentListLoading);
  const deletedLoading = useAppSelector(selectStudentDeleteLoading);
  const { data: studentList, pagination } = useAppSelector(selectStudentList);
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState("");

  const columns: ColumnsType<Student> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Mark",
      dataIndex: "mark",
      key: "mark",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Modified At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags !== undefined
            ? tags.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })
            : ""}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, { id }) => (
        <Space size="middle">
          <Link to={`/admin/students/edit-student/${id}`}>
            Edit <EditOutlined />
          </Link>
          <a onClick={() => showModal(id)}>
            Delete <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const showModal = (id: string) => {
    setStudentId(id);
    setOpen(true);
  };

  const handleRemoveStudent = () => {
    dispatch({ type: ACTIONS.DELETE_STUDENT, payload: { id: studentId } });
  };

  const handleFetchData = (page: number, pageSize: number) => {
    dispatch({
      type: ACTIONS.FETCH_STUDENT_DATA,
      payload: { page: page, limit: pageSize },
    });
  };

  useEffect(() => {
    dispatch(() => {
      dispatch({ type: ACTIONS.FETCH_STUDENT_DATA, payload: {} });
    });
  }, [dispatch]);

  return (
    <>
      <div style={{ padding: "15px" }}>
        <Link
          to="/admin/students/create-new-student"
          style={{ fontSize: "25px" }}
        >
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
          position: ["bottomCenter"],
          total: pagination._totalRows,
          showSizeChanger: true,
          onChange: (current, pageSize) => handleFetchData(current, pageSize),
        }}
      />
      <Modal
        title="Are you sure delete this student!"
        okText="Yes"
        cancelText="No"
        width="300px"
        open={open}
        onOk={handleRemoveStudent}
        confirmLoading={deletedLoading}
        onCancel={() => setOpen(false)}
      ></Modal>
    </>
  );
}

export default StudentPage;
