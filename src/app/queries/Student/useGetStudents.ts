import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queries";
import studentApi from "../../../api/students/studentApi";
import { OptionHasDefault } from "../../../types/ReactQuery";
import { ListParams, ListResponse, Student } from "../../models";

type TGetListStudentProps<T> = {
  filterSetting: ListParams;
  options?: Omit<UseQueryOptions<unknown, unknown, T, any[]>, OptionHasDefault>;
};

export function useGetStudents<T = ListResponse<Student>>(
  props: TGetListStudentProps<T>
) {
  // Props
  const { filterSetting, options } = props;
  const {
    _page = 1,
    _limit = 10,
    _order = "desc",
    _sort = "updatedAt",
    ...restOfFilterSetting
  } = filterSetting;
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STUDENTS, { _page, _limit, _order, _sort }],
    queryFn: () =>
      studentApi.getAll({ _page, _limit, _order, _sort, restOfFilterSetting }),
    keepPreviousData: false,
    staleTime: 3 * (60 * 1000),
    cacheTime: 5 * (60 * 1000),
    ...options,
  });
}
