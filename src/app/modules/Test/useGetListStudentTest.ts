import { UseQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queries";
import studentApi from "../../../api/students/studentApi";
import { OptionHasDefault } from "../../../types/ReactQuery";
import { ListParams, ListResponse, Student } from "../../models";

type TGetListStudentTestProps<T> = {
  filterSetting: ListParams;
  options?: Omit<UseQueryOptions<unknown, unknown, T, any[]>, OptionHasDefault>;
};

export function useGetListStudentTest<T = ListResponse<Student>>(
  props: TGetListStudentTestProps<T>
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

  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_STUDENTS],
    queryFn: () => studentApi.getAll,
    getPreviousPageParam: (lastPage, pages) =>
      console.log("prePage: ", lastPage, pages, "prePages: ", pages),
    getNextPageParam: (lastPage, pages) => {
      console.log("lastPage: ", lastPage);
      console.log("pages: ", pages);
      // if (
      //   pages.length <
      //   Math.ceil(lastPage.pagination._totalRows / QUERY_LIMIT_RESULTS)
      // ) {
      //   return pages.length + 1;
      // }
      return undefined;
    },
    staleTime: 3 * (60 * 1000),
    cacheTime: 5 * (60 * 1000),
  });
}
