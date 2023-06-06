// Constants
import { authors, quotes } from "../components/mockData";

// Types
import { TAuthor, TQuote, TQuotesByAuthor } from "../type";

// So we do not have any clashes with our hardcoded ones
let idCount = quotes.length + 1;

export const getQuotes = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];

    const custom = {
      ...random,
      id: `G${idCount++}`,
    };

    return custom;
  });

export const getAuthors = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = authors[Math.floor(Math.random() * authors.length)];

    const custom = {
      ...random,
      id: `author-${idCount++}`,
    };

    return custom;
  });

const getQuotesByAuthor = (author: TAuthor, quotes: TQuote[]) =>
  quotes.filter((quote) => quote.author === author);

export const authorQuoteMap = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getQuotesByAuthor(author, quotes),
  }),
  {}
);

export const generateQuoteMap = (quoteCount: number): TQuotesByAuthor =>
  authors.reduce(
    (previous, author) => ({
      ...previous,
      [author.name]: getQuotes(quoteCount / authors.length),
    }),
    {}
  );

/**
 * Reorders an array by moving an item from a given startIndex to an endIndex.
 *
 * @param {any[]} list - The array to be reordered.
 * @param {number} startIndex - The index of the item to be moved.
 * @param {number} endIndex - The desired index where the item should be placed.
 * @returns {any[]} The reordered array.
 */
export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const reorderQuoteMap = ({
  quoteMap,
  source,
  destination,
}: {
  quoteMap: TQuotesByAuthor;
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  };
}) => {
  const current = [...quoteMap[source.droppableId]];
  const next = [...quoteMap[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered,
    };
    return {
      quoteMap: result,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    quoteMap: result,
  };
};

// export function moveBetween({ list1 :any, list2, source, destination }) {
//   const newFirst = Array.from(list1.values);
//   const newSecond = Array.from(list2.values);

//   const moveFrom = source.droppableId === list1.id ? newFirst : newSecond;
//   const moveTo = moveFrom === newFirst ? newSecond : newFirst;

//   const [moved] = moveFrom.splice(source.index, 1);
//   moveTo.splice(destination.index, 0, moved);

//   return {
//     list1: {
//       ...list1,
//       values: newFirst
//     },
//     list2: {
//       ...list2,
//       values: newSecond
//     }
//   };
// }
