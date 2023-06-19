/* eslint-disable jsx-a11y/anchor-is-valid */
// Libs
import { useState } from "react";
import { Link, generatePath } from "react-router-dom";

// Antd
import { Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

// Hooks
import { useGetStudents } from "../../../../../../queries/Student/useGetStudents";
import { useDeleteStudent } from "../../../../../../queries/Student/useDeleteStudent";

// Constants
import { ROUTES } from "../../../../../../../constants/routes";

type TRecord = {
  key?: string;
  name: string;
  age: number;
  mark: number;
  gender: "male" | "female" | "";
  city: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export interface StudentProps {}

function StudentTable(props: StudentProps) {
  // Delete Student
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const { mutate, isLoading: isDeleteLoading } = useDeleteStudent();

  // Get List of students
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: list, isFetching } = useGetStudents({
    filterSetting: { _page: page, _limit: limit },
  });
  const { data, pagination } = list || { data: [], pagination: {} };
  // ************************
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
          <Link to={generatePath(ROUTES.STUDENT_UPDATE.path, { id: key })}>
            Edit <EditOutlined />
          </Link>
          <a onClick={() => showModal(key)}>
            Delete <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const showModal = (id?: string) => {
    setStudentId(id || "");
    setOpen(true);
  };

  const handleRemoveStudent = () => {
    mutate(studentId);
    setOpen(false);
  };

  const handleFetchData = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
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

  return (
    <>
      <div style={{ padding: "15px" }}>
        <Link to={ROUTES.STUDENT_CREATE.path} style={{ fontSize: "25px" }}>
          <UserAddOutlined />
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={studentList}
        loading={isFetching}
        pagination={{
          pageSize: pagination._limit || 10,
          current: pagination._page || 1,
          position: ["bottomCenter"],
          total: pagination._totalRows || 0,
          showSizeChanger: true,
          defaultPageSize: 1,
          onChange: (current, pageSize) => handleFetchData(current, pageSize),
        }}
      />
      <Modal
        title="Are you sure delete this student!"
        okText="Yes"
        cancelText="No"
        width="300px"
        open={open || isDeleteLoading}
        onOk={handleRemoveStudent}
        confirmLoading={isDeleteLoading}
        onCancel={() => setOpen(false)}
      ></Modal>
    </>
  );
}

export default StudentTable;
