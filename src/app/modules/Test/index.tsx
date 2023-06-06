import React from "react";
import { get } from "lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_LIMIT_RESULTS } from "../../../constants/queries";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

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

export function Test() {
  const fetchProjects = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `http://js-post-api.herokuapp.com/api/students?_limit=${QUERY_LIMIT_RESULTS}&_page=${pageParam}`
    );
    console.log(res);

    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    getPreviousPageParam: (lastPage, pages) => {
      console.log("preLastPage: ", lastPage, pages);
      console.log("prePages: ", pages);
    },
    getNextPageParam: (lastPage, pages) => {
      console.log("lastPage: ", lastPage);
      console.log("pages: ", pages);
      if (
        pages.length <
        Math.ceil(lastPage.pagination._totalRows / QUERY_LIMIT_RESULTS)
      ) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  const studentList = data?.pages[data.pages.length - 1] || [];

  const columns: ColumnsType<TRecord> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
  ];

  const handleFetchData = (current: number, pageSize: number) => {
    const prePage = studentList.pagination._page;
    console.log("prePage: ", prePage, "current: ", current);

    prePage < current
      ? fetchNextPage({ pageParam: current })
      : fetchPreviousPage({ pageParam: current });
  };

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {get(error, "message")}</p>
  ) : (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map(
            (project: {
              id: React.Key | null | undefined;
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <p key={project.id}>{project.name}</p>
            )
          )}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>

      <Table
        columns={columns}
        dataSource={studentList.data}
        pagination={{
          pageSize: studentList.pagination._limit || 10,
          current: studentList.pagination._page || 1,
          position: ["bottomCenter"],
          total: studentList.pagination._totalRows || 0,
          showSizeChanger: true,
          defaultPageSize: 1,
          onChange: (current, pageSize) => handleFetchData(current, pageSize),
        }}
      />
    </>
  );
}
