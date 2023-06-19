// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Apis
import { listApi } from "../../../../api/todoList";

// Constants
import { MESSAGE } from "../../../../constants";

// Hooks
import { QUERY_KEYS } from "../../../../constants/queries";

export function useUpdateList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_LIST],
    mutationFn: listApi.update,
    onMutate: async (oldList) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      return oldList;
    },
    onError: (error, variables, context) => {
      // An error happened!
      message.error(MESSAGE.UPDATE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: async (data, variables, context) => {
      // Boom baby!
      queryClient.setQueryData([QUERY_KEYS.GET_LIST, variables.id], data);

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LISTS, {}],
      });

      message.success(MESSAGE.UPDATE_SUCCESS, MESSAGE.DURATION);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
}
