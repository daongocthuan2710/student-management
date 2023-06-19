// Libs
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { OptionHasDefault } from "../../../../types/ReactQuery";

// Constants
import { QUERY_KEYS } from "../../../../constants/queries";

// Types
import { List, ListParams } from "../../../models";

// APIs
import { listApi } from "../../../../api/todoList";

type TGetListsProps<T> = {
  filterSetting: ListParams;
  options?: Omit<UseQueryOptions<unknown, unknown, T, any[]>, OptionHasDefault>;
};

export function useGetLists<T = List[]>(props: TGetListsProps<T>) {
  const { filterSetting, options } = props;
  const {
    _order = "asc",
    _sort = "position",
    status = true,
    ...restOfFilterSetting
  } = filterSetting;

  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_LISTS,
      { _order, _sort, status, ...restOfFilterSetting },
    ],
    queryFn: () =>
      listApi.getAll({ _order, _sort, status, ...restOfFilterSetting }),
    keepPreviousData: false,
    staleTime: 3 * (60 * 1000),
    cacheTime: 5 * (60 * 1000),
    ...options,
  });
}
