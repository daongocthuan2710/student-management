/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
// Libs
import React from "react";
import { Droppable } from "react-beautiful-dnd";

// Types
import { TQuote } from "../../../type";

// Styled
import { CustomWrapper, ScrollContainer } from "./styled";

// Components
import { InnerList } from "../../../components/InnerList";

export interface QuoteListProps {
  ignoreContainerClipping: any;
  internalScroll: any;
  scrollContainerStyle: any;
  isDropDisabled: any;
  isCombineEnabled: any;
  listId?: "LIST" | string;
  listType: any;
  style: any;
  quotes: TQuote[];
  title: any;
  useClone: any;
}
// props: QuoteListProps
export default function QuoteList(props: QuoteListProps) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = "LIST",
    listType,
    style,
    quotes,
    title,
    useClone,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      // type={listType}
      // ignoreContainerClipping={ignoreContainerClipping}
      // isDropDisabled={isDropDisabled}
      // isCombineEnabled={isCombineEnabled}
      // renderClone={
      //   useClone
      //     ? (provided, snapshot, descriptor) => (
      //         <QuoteItem
      //         quote={quotes[descriptor.source.index]}
      //         provided={provided}
      //         isDragging={snapshot.isDragging}
      //         isClone isGroupedOver={undefined} style={undefined} index={undefined}              />
      //       )
      //     : null
      // }
    >
      {(dropProvided, dropSnapshot) => (
        <CustomWrapper
          style={style}
          $isDraggingOver={dropSnapshot.isDraggingOver}
          $isDropDisabled={isDropDisabled}
          $isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList
                quotes={quotes}
                title={title}
                dropProvided={dropProvided}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              quotes={quotes}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </CustomWrapper>
      )}
    </Droppable>
  );
}
