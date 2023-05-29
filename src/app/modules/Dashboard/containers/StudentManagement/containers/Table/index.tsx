/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks";

// Slice
import {
  selectStudentDeleteLoading,
  selectStudentList,
  selectStudentListLoading,
} from "../../slice";

// Ant Libs
import { Modal, Space, Table, Tag} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ACTIONS } from "../../slice/sagaActions";

type TRecord = {
  key: string;
  name: string;
  age: number;
  mark: number;
  gender: "male" | "female" | "";
  city: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export interface StudentProps {}

function StudentTable(props: StudentProps) {
  const dispatch = useAppDispatch();
  const listedLoading = useAppSelector(selectStudentListLoading);
  const deletedLoading = useAppSelector(selectStudentDeleteLoading);
  const { data, pagination } = useAppSelector(selectStudentList);
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState("");

  const columns: ColumnsType<TRecord> = [
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
      render: (_, { key }) => (
        <Space size="middle">
          <Link to={`/dashboard/students/edit-student/${key}`}>
            Edit <EditOutlined />
          </Link>
          <a onClick={() => showModal(key)}>
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
    setOpen(false);
  };

  const handleFetchData = (page: number, pageSize: number) => {
    dispatch({
      type: ACTIONS.FETCH_STUDENT_DATA,
      payload: { page: page, limit: pageSize },
    });
  };

  const studentList: TRecord[] = data.map((item) => ({
    key: item.id,
    name: item.name,
    age: item.age,
    mark: item.mark,
    gender: item.gender,
    city: item.city,
    tags: item.tags,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  useEffect(() => {
    dispatch(() => {
      dispatch({ type: ACTIONS.FETCH_STUDENT_DATA, payload: {} });
    });
  }, [dispatch]);

  return (
    <>
      <div style={{ padding: "15px" }}>
        <Link
          to="/dashboard/students/create-new-student"
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
        open={open || deletedLoading}
        onOk={handleRemoveStudent}
        confirmLoading={deletedLoading}
        onCancel={() => setOpen(false)}
      ></Modal>
    </>
  );
}

export default StudentTable;
