// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Apis
import { cardApi } from "../../../../api/todoList/cardApi";

// Constants
import { MESSAGE } from "../../../../constants";

// Hooks
import { QUERY_KEYS } from "../../../../constants/queries";

export function useUpdateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_CARD],
    mutationFn: cardApi.update,
    onMutate: (oldCard) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      return oldCard;
    },
    onError: (error, variables, context) => {
      // An error happened!
      message.error(MESSAGE.UPDATE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: async (data, variables, context) => {
      // Boom baby!
      await queryClient.setQueryData([QUERY_KEYS.GET_CARD, variables.id], data);

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CARDS, { list_id: variables.list_id }],
      });

      message.success(MESSAGE.UPDATE_SUCCESS, MESSAGE.DURATION);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
}
