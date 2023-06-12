import dayjs from "dayjs";
import { Model } from "./model";

export type TList = {
  _id: string;
  name: string;
  position: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TListCreate = {
  name: string;
  status: boolean;
};

export class List extends Model<TList> {
  get id() {
    return this.model._id || "";
  }

  get name() {
    return this.model.name || "";
  }

  get position() {
    return typeof this.model.position === "number"
      ? this.model.position
      : undefined;
  }

  get status() {
    return this.model.status || undefined;
  }

  get createdAt() {
    return dayjs(this.model.createdAt).isValid()
      ? dayjs(this.model.createdAt).format("DD/MM/YYYY - HH:mm:ss")
      : "-";
  }

  get updatedAt() {
    return dayjs(this.model.updatedAt).isValid()
      ? dayjs(this.model.updatedAt).format("DD/MM/YYYY - HH:mm:ss")
      : "-";
  }

  get version() {
    return this.model.__v || 0;
  }
}
