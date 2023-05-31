import { useMutation } from "@tanstack/react-query";
import studentApi from "../../../../../../api/studentApi";
import { TUpdateStudent } from "../containers/UpdateStudentInfo/type";

export function useUpdateStudent() {
  return useMutation({
    mutationFn: studentApi.update,
    onMutate: (oldStudent: TUpdateStudent) => {
      console.log("mute: ", oldStudent);

      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`Error: ${error}, context: ${context}`);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      console.log(
        `Success: data: ${data}, variables: ${variables}, context: ${context}`
      );
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
      console.log(
        `Settled: data: ${data}, error: ${error}, variables: ${variables}, context: ${context}`
      );
    },
  });
}
