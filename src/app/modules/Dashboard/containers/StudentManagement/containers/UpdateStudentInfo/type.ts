import { TCreateStudent } from "../../../../../../models";

export type TUpdateStudent = {
    id: string;
    data : Partial<TCreateStudent>
}
