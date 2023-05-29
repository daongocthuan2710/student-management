import { TCity } from "../app/models";
import { ListResponse } from "../types/common";
import axiosClient from "./axiosClient";

const cityApi = {
  getAll(): Promise<ListResponse<TCity>> {
    const url = "/cities";
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};

export default cityApi;
