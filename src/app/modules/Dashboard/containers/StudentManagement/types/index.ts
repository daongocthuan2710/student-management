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
