export type TAuthor = {
  id: string;
  name: string;
  url: string;
  avatarUrl: string;
  colors: {
    soft: string;
    hard: string;
  };
};

export type TQuote = {
  id: string;
  content: string;
  author: TAuthor;
};

export type TQuotesByAuthor = Record<string, TQuote[]>;

export type TCardCreate = {
  list_id: string;
  title: string;
  description: string;
  status: boolean;
};
