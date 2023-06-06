import React from "react";
import { Draggable } from "react-beautiful-dnd";
import QuoteItem from "../QuoteItem";
import { TQuote } from "../../type";
interface InnerQuoteListProps {
  quotes: TQuote[];
}

export const InnerQuoteList = (props: InnerQuoteListProps) => {
  return (
    <>
      {props.quotes.map((quote, index) => (
        <Draggable key={quote.id} draggableId={quote.id} index={index}>
          {(dragProvided, dragSnapshot) => (
            <QuoteItem
              key={quote.id}
              quote={quote}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
              style={undefined}
              isClone={dragSnapshot.isClone}
              index={index}
            />
          )}
        </Draggable>
      ))}
    </>
  );
};
