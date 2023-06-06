// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { push } from "connected-react-router";
import { message } from "antd";

// Apis
import studentApi from "../../../api/studentApi";

// Hooks
import { useAppDispatch } from "../../hooks/hooks";

// Constants
import { MESSAGE } from "../../../constants";
import { ROUTES } from "../../../constants/routes";
import { QUERY_KEYS } from "../../../constants/queries";

export function useCreateStudent() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentApi.add,
    onMutate: (newStudent) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
    },
    onError: (error, variables, context) => {
      // An error happened!
      message.success(MESSAGE.CREATE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LIST_STUDENTS, {}],
      });
      message.success(MESSAGE.CREATE_SUCCESS, MESSAGE.DURATION);
      dispatch(push(ROUTES.STUDENT.path));
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
}
