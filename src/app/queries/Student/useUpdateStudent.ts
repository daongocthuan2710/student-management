// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { push } from "connected-react-router";
import { message } from "antd";

// Apis
import studentApi from "../../../api/students/studentApi";

// Types
import { TUpdateStudent } from "../../modules/Dashboard/containers/StudentManagement/containers/UpdateStudentInfo/type";

// Constants
import { MESSAGE } from "../../../constants";

// Hooks
import { QUERY_KEYS } from "../../../constants/queries";
import { ROUTES } from "../../../constants/routes";
import { useAppDispatch } from "../../hooks/hooks";

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_STUDENT],
    mutationFn: studentApi.update,
    onMutate: (oldStudent: TUpdateStudent) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
    },
    onError: (error, variables, context) => {
      // An error happened!
      message.error(MESSAGE.UPDATE_FAILED, MESSAGE.DURATION);
    },
    onSuccess: async (data, variables, context) => {
      // Boom baby!
      await queryClient.setQueryData(
        [QUERY_KEYS.GET_STUDENT, variables.id],
        variables.data
      );
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LIST_STUDENTS, {}],
      });

      dispatch(push(ROUTES.STUDENT.path));
      message.success(MESSAGE.UPDATE_SUCCESS, MESSAGE.DURATION);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
      console.log(
        `Settled: data: ${data}, error: ${error}, variables: ${variables}, context: ${context}`
      );
    },
  });
}
