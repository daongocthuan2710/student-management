import React from "react";
import styled from "styled-components";
import { borderRadius, grid } from "../../constants";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { TQuote } from "../../type";

const getBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
  authorColors: {
    soft: any;
    hard: any;
  }
) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return "#EBECF0";
  }

  return "#FFFFFF";
};

const getBorderColor = (isDragging: boolean, authorColors: { hard: any }) =>
  isDragging ? authorColors.hard : "transparent";

const getRotate = (isDragging: boolean) => {
  return isDragging ? "rotate(15deg)" : "rotate(0deg)";
};

const imageSize = 40;

const CloneBadge = styled.div`
  background: #79f2c0;
  bottom: ${grid / 2}px;
  border: 2px solid #57d9a3;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);
  height: ${imageSize}px;
  width: ${imageSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.a<{
  $isDragging: boolean;
  $isGroupedOver: boolean;
  $colors: { hard: string; soft: string };
}>`
  user-select: none;
  border: 2px solid transparent;
  box-sizing: border-box;
  border-radius: ${borderRadius}px;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  transform: ${(props) =>
    props.$isDragging ? `rotate(15deg)` : `rotate(0deg)`};
  border-color: ${(props) => getBorderColor(props.$isDragging, props.$colors)};
  background-color: ${(props) =>
    getBackgroundColor(props.$isDragging, props.$isGroupedOver, props.$colors)};
  box-shadow: ${(props) => getRotate(props.$isDragging)};

  /* anchor overrides */
  color: #091e42;

  &:hover,
  &:active {
    color: #091e42;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.$colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const Author = styled.small<{ $colors: { hard: any; soft: any } }>`
  color: ${(props) => props.$colors.hard};
  flex-grow: 0;
  margin: 0;
  background-color: ${(props) => props.$colors.soft};
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

function getStyle(provided: DraggableProvided, style: any) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function QuoteItem(props: {
  quote: TQuote;
  isDragging: boolean;
  isGroupedOver: boolean;
  provided: DraggableProvided;
  style: any;
  isClone: boolean;
  index: number;
}) {
  const { quote, isDragging, isGroupedOver, provided, style, index, isClone } =
    props;

  return (
    <Container
      href={quote.author.url}
      $isDragging={isDragging}
      $isGroupedOver={isGroupedOver}
      $colors={quote.author.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={quote.id}
      data-index={index}
      aria-label={`${quote.author.name} quote ${quote.content}`}
    >
      <Avatar src={quote.author.avatarUrl} alt={quote.author.name} />
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
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
