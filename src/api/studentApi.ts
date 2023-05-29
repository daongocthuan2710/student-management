import { ListParams, ListResponse } from "../app/models";
import { Student, TStudent } from "../app/models/student";
import axiosClient from "./axiosClient";

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<TStudent>> {
    const url = "/students";
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },

  add(data: Student): Promise<Student> {
    const url = "/students";
    return axiosClient.post(url, data);
  },

  update({ data, id }: { data: {}; id: String }): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.patch(url, data);
  },

  delete(id: string): Promise<any> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
