// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Apis
import studentApi from "../../../api/studentApi";

// Constants
import { MESSAGE } from "../../../constants";
import { QUERY_KEYS } from "../../../constants/queries";

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.DELETE_STUDENT],
    mutationFn: studentApi.delete,
    onMutate: (studentId) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
    },
    onError: (error, variables, context) => {
      // An error happened!
      message.success(MESSAGE.DELETE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: async (data, variables, context) => {
      // Boom baby!
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LIST_STUDENTS, {}],
      });
      message.success(MESSAGE.CREATE_SUCCESS, MESSAGE.DURATION);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
}
