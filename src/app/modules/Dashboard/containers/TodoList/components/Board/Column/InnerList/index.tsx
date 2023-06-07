import React from "react";

// Types
import { TQuote } from "../../../../type";

// Styled

// Components
import { CustomContainer, DropZone } from "./styled";
import { Draggable } from "react-beautiful-dnd";
import QuoteItem from "./QuoteItem";

export const InnerList = (props: { quotes: TQuote[]; dropProvided?: any }) => {
  const { quotes, dropProvided } = props;

  return (
    <CustomContainer>
      <DropZone ref={dropProvided.innerRef}>
        {quotes.map((quote, index) => (
          <Draggable key={quote.id} draggableId={quote.id} index={index}>
            {(dragProvided, dragSnapshot) => (
              <QuoteItem
                key={quote.id}
                quote={quote}
                dragSnapshot={dragSnapshot}
                provided={dragProvided}
                index={index}
              />
            )}
          </Draggable>
        ))}
        {dropProvided.placeholder}
      </DropZone>
    </CustomContainer>
  );
};
