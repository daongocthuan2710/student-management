import dayjs from "dayjs";
import { Model } from "./model";
import { DATE_TIME_FORMAT } from "../../constants/datetime";
dayjs().format();

export type TStudent = {
  id?: string;
  name: string;
  age: number;
  mark: number;
  gender: "male" | "female";
  city: string;
  tags?: string[];
  createdAt?: number;
  updatedAt?: number;
};

export class Student extends Model<TStudent> {
  get id() {
    return this.model.id || "";
  }

  get name() {
    return this.model.name || "";
  }

  get age() {
    return this.model.age || "";
  }

  get mark() {
    return this.model.mark || "";
  }

  get gender() {
    return this.model.gender || "";
  }

  get city() {
    return this.model.city || "";
  }

  get tags() {
    return this.model.tags || ["nice", "developer"];
  }

  get createdAt() {
    return dayjs(this.model.createdAt).isValid()
      ? dayjs(this.model.createdAt).format(DATE_TIME_FORMAT.DATE_TIME)
      : "-";
  }

  get updatedAt() {
    return dayjs(this.model.updatedAt).isValid()
      ? dayjs(this.model.updatedAt).format(DATE_TIME_FORMAT.DATE_TIME)
      : "-";
  }
}
