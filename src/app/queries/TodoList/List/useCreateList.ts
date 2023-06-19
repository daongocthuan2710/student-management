// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Apis
import { listApi } from "../../../../api/todoList";

// Constants
import { MESSAGE } from "../../../../constants";
import { QUERY_KEYS } from "../../../../constants/queries";

export function useCreateList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_LIST],
    mutationFn: listApi.add,
    onMutate: (newList) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      return newList;
    },
    onError: (error, variables, context) => {
      // An error happened!
      message.error(MESSAGE.CREATE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LISTS, {}],
      });
      message.success(MESSAGE.CREATE_SUCCESS, MESSAGE.DURATION);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
}
