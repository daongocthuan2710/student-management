export class Model<T> {
  model: { [P in keyof T]?: T[P] };

  constructor(model: { [P in keyof T]?: T[P] }) {
    this.model = model;
  }
}
