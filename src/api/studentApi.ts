import axiosClient from "./axiosClient";

// Types
import {
  ListParams,
  ListResponse,
  PagingnationParams,
  TCreateStudent,
} from "../app/models";
import { Student, TStudent } from "../app/models/student";

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

  getById(id: string): Promise<TStudent> {
    const url = `${baseUrl}/${id}`;
    return axiosClient.get(url);
  },

  add(data: TCreateStudent): Promise<TStudent> {
    const url = baseUrl;
    return axiosClient.post(url, data);
  },

  update({ data, id }: { data: {}; id: String }): Promise<TStudent> {
    const url = `${baseUrl}/${id}`;
    return axiosClient.patch(url, data);
  },

  delete(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
