import axiosClient from "./axiosClient";

// Types
import { List, TList, TListCreate } from "../../app/models";
import { ListParams } from "../../types/common";
import { TListChange } from "../../app/modules/Dashboard/containers/TodoList/types";

const baseUrl = `/lists`;

export const listApi = {
  async getAll(params?: ListParams): Promise<List[]> {
    const url = baseUrl;
    const response = await axiosClient.get(url, { params });

    const data: TList[] = response.data || [];
    const result: List[] = data.map((list) => new List(list));

    return result;
  },
  async add(body: TListCreate): Promise<List> {
    const url = `${baseUrl}`;
    const response = await axiosClient.post(url, body);

    const data: TList = response.data || [];
    const result: List = new List(data);

    return result;
  },
  async update({ id, body }: { id: string; body: {} }): Promise<List> {
    const url = `${baseUrl}/${id}`;
    const response = await axiosClient.patch(url, body);

    const data: TList = response.data || [];
    const result: List = new List(data);

    return result;
  },
  async updateMany(body: TListChange): Promise<any> {
    console.log("body: ", body);
    
    const url = baseUrl;
    const response = await axiosClient.patch(url, body);
    console.log("response: ", response);

    const data: any[] = response.data || [];
    // const result: List = new List(data);

    return data;
  },
};
