/* eslint-disable @typescript-eslint/no-unused-expressions */
// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Apis
import { listApi } from "../../../../api/todoList";

// Constants
import { MESSAGE } from "../../../../constants";

// Hooks
import { QUERY_KEYS } from "../../../../constants/queries";
import { List } from "../../../models";
import { reorder } from "../../../modules/Dashboard/containers/TodoList/utils";

export function useUpdateManyList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_MANY_LIST],
    mutationFn: listApi.updateMany,
    onMutate: (dataUpdate) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
    },
    onError: async (error, variables, context) => {
      // An error happened!

      message.error(MESSAGE.UPDATE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: async (data, variables, context) => {
      // Boom baby!

      message.success(MESSAGE.UPDATE_SUCCESS, MESSAGE.DURATION);
    },
    onSettled: async (data, error, variables, context) => {
      // Error or success... doesn't matter!
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LISTS, {}],
      });
    },
  });
}
