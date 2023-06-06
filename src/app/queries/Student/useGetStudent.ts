import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queries";
import studentApi from "../../../api/studentApi";
import { OptionHasDefault } from "../../../types/ReactQuery";
import { Student } from "../../models";

type TGetStudentProps<T> = {
  id: string;
  options?: Omit<UseQueryOptions<unknown, unknown, T, any[]>, OptionHasDefault>;
};

export function useGetStudent<T = Student>(props: TGetStudentProps<T>) {
  // Props
  const { id, options } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.GET_STUDENT, id],
    queryFn: () => studentApi.getById(id),
    keepPreviousData: false,
    staleTime: 3 * (60 * 1000),
    cacheTime: 5 * (60 * 1000),
    ...options,
  });
}
