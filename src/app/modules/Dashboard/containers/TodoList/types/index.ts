import { Card, List, ListParams } from "../../../../../models";

export type TAction<T> = {
  payload: T;
  type: string;
};

export type TListChange = {
  id: string;
  body: {
    position: any;
  };
  params?: ListParams;
};

export type TCardChange = {
  id: string;
  list_id: string;
  body: {
    position: any;
  };
  params?: ListParams;
};

export type TChangePositionListPayload = {
  dataChange: TListChange[];
  lists: List[];
};

export type TChangePositionCardPayload = {
  dataChange: TCardChange[];
  cards: Card[];
};
