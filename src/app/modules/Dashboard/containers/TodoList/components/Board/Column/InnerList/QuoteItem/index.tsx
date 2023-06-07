// Libs
import React from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { Avatar } from "antd";

// Types
import { TQuote } from "../../../../../type";

// Styled
import {
  Author,
  BlockQuote,
  Container,
  Content,
  Footer,
  QuoteId,
} from "./styled";

function QuoteItem(props: {
  quote: TQuote;
  provided: DraggableProvided;
  dragSnapshot: DraggableStateSnapshot;
  style?: any;
  index?: number;
}) {
  const { quote, provided, style, index, dragSnapshot } = props;

  function getStyle(provided: DraggableProvided, style: any) {
    if (!style) {
      return provided.draggableProps.style;
    }
    console.log(
      "provided.draggableProps.style: ",
      provided.draggableProps.style
    );
    return {
      ...provided.draggableProps.style,
      ...style,
    };
  }

  return (
    <Container
      href={quote.author.url}
      $isDragging={dragSnapshot.isDragging}
      $isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
      $colors={quote.author.colors}
      $inherited={
        provided.draggableProps.style ? provided.draggableProps.style : ""
      }
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={dragSnapshot.isDragging}
      data-testid={quote.id}
      data-index={index}
      aria-label={`${quote.author.name} quote ${quote.content}`}
    >
      <Avatar src={quote.author.avatarUrl} alt={quote.author.name} />
      <Content>
        <BlockQuote>{quote.content}</BlockQuote>
        <Footer>
          <Author $colors={quote.author.colors}>{quote.author.name}</Author>
          <QuoteId>
            id:
            {quote.id}
          </QuoteId>
        </Footer>
      </Content>
    </Container>
  );
}

export default React.memo(QuoteItem);
