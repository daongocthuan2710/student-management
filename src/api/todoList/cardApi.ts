import axiosClient from "../axiosClient";

// Types
import { ListParams } from "../../types/common";
import { Card, TCard } from "../../app/models";
import { TCardCreate } from "../../app/modules/Dashboard/containers/TodoList/type";

const baseUrl = `${process.env.REACT_APP_BASE_LOCAL_API}/cards`;

export const cardApi = {
  async getAll(params?: ListParams): Promise<Card[]> {
    const url = baseUrl;
    const response = await axiosClient.get(url, { params });

    const data: TCard[] = response.data || [];

    const result: Card[] = data.map((card) => new Card(card));

    return result;
  },
  async getAllByList(list_id: string, params?: ListParams): Promise<Card[]> {
    const url = `${baseUrl}/${list_id}`;
    const response = await axiosClient.get(url, { params });

    const data: TCard[] = response.data || [];

    const result: Card[] = data.map((card) => new Card(card));

    return result;
  },
  async create(newCard: TCardCreate): Promise<Card> {
    const url = baseUrl;
    const response = await axiosClient.post(url, newCard);

    const data: TCard = response.data || [];

    const result: Card = new Card(data);

    return result;
  },

  async update({
    id,
    list_id,
    body,
    params,
  }: {
    id: string;
    list_id: string;
    body: {};
    params?: ListParams;
  }): Promise<Card> {
    const url = `${baseUrl}/${list_id}/${id}`;
    const response = await axiosClient.patch(url, body, { params });
    console.log("response: ", response);

    const data: TCard = response.data || [];

    const result: Card = new Card(data);

    return result;
  },
};
