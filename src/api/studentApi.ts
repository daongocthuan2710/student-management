import axiosClient from "./axiosClient";

// Types
import {
  ListParams,
  ListResponse,
  PagingnationParams,
  TCreateStudent,
} from "../app/models";
import { Student, TStudent } from "../app/models/student";
import { TUpdateStudent } from "../app/modules/Dashboard/containers/StudentManagement/containers/UpdateStudentInfo/type";

const baseUrl = "/students";

const studentApi = {
  async getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = baseUrl;
    const response = await axiosClient.get(url, { params });

    const data: TStudent[] = response.data.data || [];
    const pagination: PagingnationParams = response.data.pagination || {};

    const ListResponse: ListResponse<Student> = {
      data: data.map((student) => new Student(student)),
      pagination: pagination,
    };

    return ListResponse;
  },

  async getById(id: string): Promise<Student> {
    const url = `${baseUrl}/${id}`;
    const response = await axiosClient.get(url);
    const student: Student = new Student(response.data);
    return student;
  },

  add(data: TCreateStudent): Promise<TStudent> {
    const url = baseUrl;
    return axiosClient.post(url, data);
  },

  update({ data, id }: TUpdateStudent): Promise<TStudent> {
    const url = `${baseUrl}/${id}`;
    return axiosClient.patch(url, data);
  },

  delete(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
