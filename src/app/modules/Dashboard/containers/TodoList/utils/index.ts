// Constants
import { Card } from "../../../../../models";
import { authors, quotes } from "../constants/mockData";

// Types
import { TAuthor, TQuote, TQuotesByAuthor } from "../type";

// So we do not have any clashes with our hardcoded ones
let idCount = quotes.length + 1;

/**
 * Get list of quotes from given count number and assign id to each quote
 * @param count the number of quotes
 * @returns a list of quotes with id
 */
export const getQuotes = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];

    const custom = {
      ...random,
      id: `${idCount++}`,
    };

    return custom;
  });

/**
 * get list of author from given count number and assign id to each author
 * @param count the number of authors
 * @returns a list of authors with id
 */
export const getAuthors = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = authors[Math.floor(Math.random() * authors.length)];

    const custom = {
      ...random,
      id: `author-${idCount++}`,
    };

    return custom;
  });

/**
 * Returns the quotes of the given quote list that maps to the given author
 * @param author the author of the quote list
 * @param quotes the quote list to map
 * @returns the quotes of the given quote list that maps to the given author
 */
const getQuotesByAuthor = (author: TAuthor, quotes: TQuote[]) =>
  quotes.filter((quote) => quote.author === author);

/**
 * Gennerates a quote list by authors name from a given quoteCount
 * @param quoteCount the number of quotes to generate
 * @returns a list of quotes generated from a given quoteCount string with author names
 */
export const authorQuoteMap = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getQuotesByAuthor(author, quotes),
  }),
  {}
);

/**
 * Gennerates a quote list by authors name from a given quoteCount
 * @param quoteCount the number of quotes to generate
 * @returns a list of quotes generated from a given quoteCount string with author names
 */
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

/**
 * Reorders items in a quote map based on when drap-and-drop an quote item.
 *
 * @param {Object} params - The parameters for reordering.
 * @param {TQuotesByAuthor} params.quoteMap - The quote map containing quotes categorized by author.
 * @param {Object} params.source - The source location from where an item is being moved.
 * @param {string} params.source.droppableId - The identifier of the source list or container.
 * @param {number} params.source.index - The index of the item within the source list.
 * @param {Object} params.destination - The destination location where the item is being moved.
 * @param {string} params.destination.droppableId - The identifier of the destination list or container.
 * @param {number} params.destination.index - The index at which the item will be placed within the destination list.
 * @returns {Object} - An object with the updated quote map.
 * @property {TQuotesByAuthor} quoteMap - The updated quote map with reordered items.
 */
export const reorderCardMap = ({
  cardMap,
  source,
  destination,
}: {
  cardMap: Card[];
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  };
}) => {
  const current = cardMap.filter((card) => card.list_id === source.droppableId);
  const next = cardMap.filter(
    (card) => card.list_id === destination.droppableId
  );
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...cardMap,
      [source.droppableId]: reordered,
    };
    return {
      cardMap: result,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...cardMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    cardMap: result,
  };
};

/**
 * Swaps the positions of two items in the model array.
 *
 * @param {Array} model - The array of items.
 * @param {number} startIndex - The index of the item to be swapped with the item at the endIndex.
 * @param {number} endIndex - The index of the item to be swapped with the item at the startIndex.
 * @returns {Array} - An array containing two objects representing the swapped items.
 */
export const swapPosition = (
  model: any[],
  startIndex: number,
  endIndex: number
) => {
  const itemStart = model[startIndex];
  const itemEnd = model[endIndex];

  const data = [
    {
      id: itemStart.id,
      body: { position: itemEnd.position },
    },
    {
      id: itemEnd.id,
      body: { position: itemStart.position },
    },
  ];
  return data;
};
