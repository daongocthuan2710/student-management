export class Model<T> {
    model: { [P in keyof T]?: T[P] | undefined };
  
    constructor(model: { [P in keyof T]?: T[P] }) {
      this.model = model || {};
    }
  }