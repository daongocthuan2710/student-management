// Libs
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { OptionHasDefault } from "../../../../types/ReactQuery";

// Constants
import { QUERY_KEYS } from "../../../../constants/queries";

// Types
import { Card, ListParams } from "../../../models";

// APIs
import { cardApi } from "../../../../api/todoList/cardApi";

type TGetCardsProps<T> = {
  filterSetting: ListParams;
  options?: Omit<UseQueryOptions<unknown, unknown, T, any[]>, OptionHasDefault>;
};

export function useGetCards<T = Card[]>(props: TGetCardsProps<T>) {
  const { filterSetting, options } = props;
  const {
    _order = "asc",
    _sort = "position",
    status = true,
    ...restOfFilterSetting
  } = filterSetting;

  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_CARDS,
      { _order, _sort, status, ...restOfFilterSetting },
    ],
    queryFn: () =>
      cardApi.getAll({ _order, _sort, status, ...restOfFilterSetting }),
    keepPreviousData: false,
    staleTime: 3 * (60 * 1000),
    cacheTime: 5 * (60 * 1000),
    ...options,
  });
}
