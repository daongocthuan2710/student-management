// Libs
import { Draggable, Droppable } from "react-beautiful-dnd";

// Types
import { TQuote } from "../../../type";

// Constants
import { DROP_TYPE } from "../../../constants";

// Styled
import {
  ColumnContainer,
  ColumnFooter,
  ColumnHeader,
  CustomTitle,
} from "../../../styled";
import { InnerList } from "./InnerList";
import { CustomWrapper, ScrollContainer } from "./styled";

export interface ColumnProps {
  title: string;
  quotes: TQuote[];
  index: number;
  isScrollable: boolean;
  isCombineEnabled: boolean;
  useClone: any;
}

const Column = ({
  title,
  quotes,
  index,
  isCombineEnabled,
  isScrollable,
}: ColumnProps) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <ColumnContainer ref={provided.innerRef} {...provided.draggableProps}>
          <ColumnHeader $isDragging={snapshot.isDragging}>
            <CustomTitle
              $isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              aria-label={`${title} quote list`}
            >
              {title}
            </CustomTitle>
          </ColumnHeader>
          <Droppable
            droppableId={title}
            type={DROP_TYPE.QUOTE}
            ignoreContainerClipping={undefined}
            isDropDisabled={undefined}
            isCombineEnabled={isCombineEnabled}
          >
            {(dropProvided, dropSnapshot) => (
              <CustomWrapper
                $isDraggingOver={dropSnapshot.isDraggingOver}
                $isDropDisabled={false}
                $isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                {...dropProvided.droppableProps}
              >
                {isScrollable ? (
                  <ScrollContainer style={undefined}>
                    <InnerList quotes={quotes} dropProvided={dropProvided} />
                  </ScrollContainer>
                ) : (
                  <InnerList quotes={quotes} dropProvided={dropProvided} />
                )}
              </CustomWrapper>
            )}
          </Droppable>
          <ColumnFooter>
            <div>
              <span>+</span>
              <span>Thêm thẻ</span>
            </div>
          </ColumnFooter>
        </ColumnContainer>
      )}
    </Draggable>
  );
};

export default Column;
