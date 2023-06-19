/* eslint-disable @typescript-eslint/no-unused-expressions */
// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Apis
import { cardApi } from "../../../../api/todoList/cardApi";

// Constants
import { MESSAGE } from "../../../../constants";

// Hooks
import { QUERY_KEYS } from "../../../../constants/queries";

export function useUpdateManyCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_MANY_CARD],
    mutationFn: cardApi.updateMany,
    onMutate: (dataChange) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
    },
    onError: async (error, variables, context) => {
      // An error happened!
      message.error(MESSAGE.UPDATE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: async (data, variables, context) => {
      // message.success(MESSAGE.UPDATE_SUCCESS, MESSAGE.DURATION);
    },
    onSettled: async (data, error, variables, context) => {
      // Error or success... doesn't matter!
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CARDS, { list_id: variables.old_list_id }],
      });

      if (variables.old_list_id !== variables.body.list_id) {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CARDS, { list_id: variables.body.list_id }],
        });
      }
    },
  });
}
