import dayjs from "dayjs";
import { Model } from "./model";

export type TCard = {
  _id: string;
  list_id: string;
  title: string;
  description: string;
  position: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export class Card extends Model<TCard> {
  get id() {
    return this.model._id || "";
  }

  get list_id() {
    return this.model.list_id || "";
  }

  get title() {
    return this.model.title || "";
  }

  get description() {
    return this.model.description || "";
  }

  get position() {
    return typeof this.model.position === "number"
      ? this.model.position
      : undefined;
  }

  get status() {
    return this.model.status || false;
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
