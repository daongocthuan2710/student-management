// Libs
import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

// Styled
import { BoardContainer } from "../../styled";

// Components
import Column from "../Column";

// Types
import { TQuotesByAuthor } from "../../type";

// Utils
import { reorder, reorderQuoteMap } from "../../utils";

// Constants
import { DROP_TYPE } from "../../constants";

export interface BoardProps {
  initial: TQuotesByAuthor;
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
}

const Board = ({
  initial,
  withScrollableColumns = false,
  isCombineEnabled = false,
}: BoardProps) => {
  const [ordered, setOrdered] = useState(Object.keys(initial));
  const [columns, setColumns] = useState<TQuotesByAuthor>(initial);

  const onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === DROP_TYPE.COLUMN) {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns(orderedColumns);
      return;
    }

    // Dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // Did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reordering column
    if (result.type === DROP_TYPE.COLUMN) {
      const ReoderResult = reorder(ordered, source.index, destination.index);
      setOrdered(ReoderResult);
      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });

    if (data) setColumns(data.quoteMap);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type={DROP_TYPE.COLUMN}
          direction="horizontal"
          isCombineEnabled={isCombineEnabled}
        >
          {(provided, snapshot) => (
            <BoardContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {ordered.map((author_name, index) => (
                <Column
                  key={author_name}
                  title={author_name}
                  quotes={columns[author_name]}
                  index={index}
                  isScrollable={withScrollableColumns}
                  isCombineEnabled={isCombineEnabled}
                  useClone={provided}
                ></Column>
              ))}
              {provided.placeholder}
            </BoardContainer>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
