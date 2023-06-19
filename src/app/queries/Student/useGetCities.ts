// Libs
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queries";
import { OptionHasDefault } from "../../../types/ReactQuery";

// Types
import { City, ListParams, ListResponse } from "../../models";

// APIs
import cityApi from "../../../api/students/cityApi";

type TGetListCityProps<T> = {
  filterSetting?: ListParams;
  options?: Omit<UseQueryOptions<unknown, unknown, T, any[]>, OptionHasDefault>;
};

export function useGetListCities<T = ListResponse<City>>(
  props?: TGetListCityProps<T>
) {
  // Props
  const { filterSetting, options } = props || {};
  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_CITIES,
      filterSetting || { _page: 1, _limit: 10 },
    ],
    queryFn: () => cityApi.getAll(filterSetting || { _page: 1, _limit: 10 }),
    staleTime: Infinity,
    cacheTime: Infinity,
    ...options,
  });
}
