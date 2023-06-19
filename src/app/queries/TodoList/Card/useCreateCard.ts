// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Apis
import { cardApi } from "../../../../api/todoList/cardApi";

// Constants
import { MESSAGE } from "../../../../constants";
import { QUERY_KEYS } from "../../../../constants/queries";

export function useCreateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_CARD],
    mutationFn: cardApi.add,
    onMutate: (newCard) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      return newCard;
    },
    onError: (error, variables, context) => {
      // An error happened!
      message.error(MESSAGE.CREATE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CARDS, { list_id: variables.list_id }],
      });
      message.success(MESSAGE.CREATE_SUCCESS, MESSAGE.DURATION);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
}
