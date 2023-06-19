import { Card, List } from "../../../../../models";

export type TAction<T> = {
  payload: T;
  type: string;
};

export type TListChange = {
  id: string;
  body: {
    position: number;
  };
  params?: {
    old_position: number;
  };
};

export type TCardChange = {
  id: string;
  old_list_id: string;
  body: {
    position: number;
    list_id: string;
  };
  params?: {
    old_position?: number;
  };
};

export type TChangePositionListPayload = {
  dataChange: TListChange[];
  lists: List[];
};

export type TChangePositionCardPayload = {
  dataChange: TCardChange[];
  cards: Card[];
};
