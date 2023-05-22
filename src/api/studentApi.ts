import { ListParams, ListResponse } from "../models";
import { Student } from "../models/student";
import axiosClient from "./axiosClient";

const studentApi = {
    getAll(params: ListParams): Promise<ListResponse<Student>> {
        const url = '/students'
        return axiosClient.get(url, { params })
    },

    getById(id: string): Promise<any> {
        const url = `/students/${id}`
        return axiosClient.get(url)
    },

    add(data: Student): Promise<ListResponse<Student>> {
        const url = '/students'
        return axiosClient.get(url, { data })
    },

    update(data: Student): Promise<ListResponse<Student>> {
        const url = '/students'
        return axiosClient.get(url, { data })
    },

    delete(id: string): Promise<any> {
        const url = `/students/${id}`
        return axiosClient.get(url)
    }
}

export default studentApi;