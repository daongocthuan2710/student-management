import React from "react";
import { Draggable } from "react-beautiful-dnd";
// Styled
import { CustomContainer } from "./styled";

// Components
import QuoteItem from "./QuoteItem";

// Types
import { Card } from "../../../../../../../../models";

export const InnerList = (props: { cards: Card[]; dropProvided?: any }) => {
  const { cards, dropProvided } = props;

  return (
    <CustomContainer ref={dropProvided.innerRef}>
      {cards.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(dragProvided, dragSnapshot) => (
            <QuoteItem
              key={card.id}
              card={card}
              dragSnapshot={dragSnapshot}
              provided={dragProvided}
              index={index}
            />
          )}
        </Draggable>
      ))}
      {dropProvided.placeholder}
    </CustomContainer>
  );
};
