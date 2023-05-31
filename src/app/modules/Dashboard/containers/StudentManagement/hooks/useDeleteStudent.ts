// Libs
import { push } from "connected-react-router";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

// Apis
import studentApi from "../../../../../../api/studentApi";

// Hooks
import { useAppDispatch } from "../../../../../hooks/hooks";

// Constants
import { MESSAGE } from "../../../../../../constants";
import { ROUTES } from "../../../../../../constants/routes";

export function useDeleteStudent() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: studentApi.delete,
    onMutate: (studentId) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
    },
    onError: (error, variables, context) => {
      // An error happened!
      message.success(MESSAGE.DELETE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      message.success(MESSAGE.CREATE_SUCCESS, MESSAGE.DURATION);
      dispatch(push(ROUTES.STUDENT.path));
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
}
