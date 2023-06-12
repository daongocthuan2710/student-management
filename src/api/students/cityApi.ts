import { City, TCity } from "../../app/models";
import {
  ListParams,
  ListResponse,
  PagingnationParams,
} from "../../types/common";
import axiosClient from "../axiosClient";

const baseUrl = `${process.env.REACT_APP_FE_URL}/cities`;

const cityApi = {
  async getAll(params: ListParams): Promise<ListResponse<City>> {
    const url = baseUrl;
    const response = await axiosClient.get(url, { params });

    const data: TCity[] = response.data.data || [];
    const pagination: PagingnationParams = response.data.pagination || {};

    const ListResponse: ListResponse<City> = {
      data: data.map((city) => new City(city)),
      pagination: pagination,
    };

    return ListResponse;
  },
};

export default cityApi;
