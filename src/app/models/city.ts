import { Model } from "./model";

export type TCity = {
  code: string;
  name: string;
};

export class City extends Model<TCity> {
  get id() {
    return this.model.code || "";
  }

  get name() {
    return this.model.name || "";
  }
}
