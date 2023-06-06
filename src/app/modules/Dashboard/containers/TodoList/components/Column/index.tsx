import { colors } from "@atlaskit/theme";
import { Draggable } from "react-beautiful-dnd";
import { ColumnContainer, ColumnHeader, CustomTitle } from "../../styled";
import { TQuote } from "../../type";
import QuoteList from "../QuoteList";


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
  useClone,
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
          <QuoteList
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : null,
            }}
            quotes={quotes}
            internalScroll={isScrollable}
            isCombineEnabled={Boolean(isCombineEnabled)}
            useClone={Boolean(useClone)}
            ignoreContainerClipping={undefined}
            scrollContainerStyle={undefined}
            isDropDisabled={undefined}
            title={undefined}
          />
        </ColumnContainer>
      )}
    </Draggable>
  );
};

export default Column;
