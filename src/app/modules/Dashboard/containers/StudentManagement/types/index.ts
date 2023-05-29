import { Student } from "../../../../../models";

export type TCreateStudentPayload = Student;

export type TFetchStudentListPayload = {
  page?: number;
  limit?: number;
  order?: "desc" | "asc";
  sort?: string;
};

export type TUpdateStudentListPayload = {
  data: {};
  id: string;
};

export type TDeleteStudentListPayload = {
  id: string;
};

export type TGetStudentListPayload = {
  id: string;
};

export type TAction<T> = {
  payload: T;
  type: string;
};
