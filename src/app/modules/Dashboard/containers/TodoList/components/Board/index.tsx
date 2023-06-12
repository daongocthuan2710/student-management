/* eslint-disable react-hooks/exhaustive-deps */
// Libs
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

// Styled
import { BoardContainer, ColumnContainer } from "../../styled";

// Components
import Column from "./Column";

// Types
import { Card, List, TListCreate } from "../../../../../../models";

// Utils
import { reorder, swapPosition } from "../../utils";

// Constants
import { DROP_TYPE, grid } from "../../constants";

// Apis
import { listApi } from "../../../../../../../api/todoList";
import { cardApi } from "../../../../../../../api/todoList/cardApi";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks";
import { selectCard, selectList, todoListActions } from "../../slice";
import { TODOLIST_ACTIONS } from "../../slice/sagaActions";
import { TCardChange, TListChange } from "../../types";
import { CustomAddListBlock, CustomSpan } from "./styled";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export interface BoardProps {
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
}

const Board = ({
  withScrollableColumns = false,
  isCombineEnabled = false,
}: BoardProps) => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector(selectList) || [];
  const cards = useAppSelector(selectCard) || [];
  const [showInputAddList, setShowInputAddList] = useState<boolean>(false);

  const onDragEnd = (result: DropResult) => {
    try {
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
        const dataChange: TListChange[] = swapPosition(
          lists,
          source.index,
          destination.index
        );
        const ReoderResult: List[] = reorder(
          lists,
          source.index,
          destination.index
        );

        dispatch({
          type: TODOLIST_ACTIONS.CHANGE_POSITION_LIST,
          payload: { dataChange: dataChange, lists: ReoderResult },
        });
        return;
      }

      // moving to same list
      if (source.droppableId === destination.droppableId) {
        const currentCards = cards.filter(
          (card) => card.list_id === source.droppableId
        );

        const dataChange = swapPosition(
          currentCards,
          source.index,
          destination.index
        );

        const reoderResult = reorderCardByList(
          source.droppableId,
          cards,
          source.index,
          destination.index
        );

        dispatch({
          type: TODOLIST_ACTIONS.CHANGE_POSITION_CARD,
          payload: { dataChange: dataChange, cards: reoderResult },
        });
      } else {
        const currentCards = cards.filter(
          (card) => card.list_id === source.droppableId
        );

        let target = currentCards[source.index];
        let endCard = currentCards[destination.index];

        // remove from original
        let reoderResult = Array.from(cards);

        const startItemIndex = cards.indexOf(target);
        const endItemIndex = cards.indexOf(endCard);

        // insert into next
        const newCard: Card = new Card({
          _id: target.id,
          list_id: destination.droppableId,
          position: destination.index,
          status: target.status,
          title: target.title,
          __v: target.version,
          description: target.description,
          updatedAt: target.updatedAt,
          createdAt: target.createdAt,
        });

        reoderResult.splice(startItemIndex, 1);
        reoderResult.splice(endItemIndex, 0, newCard);

        const dataChange: TCardChange[] = [
          {
            id: target.id,
            list_id: target.list_id,
            body: { position: destination.index },
            params: { new_list_id: destination.droppableId },
          },
        ];

        dispatch({
          type: TODOLIST_ACTIONS.CHANGE_POSITION_CARD,
          payload: { dataChange: dataChange, cards: reoderResult },
        });
      }
    } catch (err) {
      console.log("Can not change position", err);
    }
  };

  const reorderCardByList = (
    list_id: string,
    cards: Card[],
    startIndex: number,
    endIndex: number
  ) => {
    const data = cards.filter((card) => card.list_id === list_id);
    const result = Array.from(cards);
    const startItem = data[startIndex];
    const endItem = data[endIndex];
    const startIndexInCards = result.indexOf(startItem);
    const endIndexInCards = result.indexOf(endItem);
    const [removed] = result.splice(startIndexInCards, 1);
    result.splice(endIndexInCards, 0, removed);
    return result;
  };

  const fetchList = async () => {
    const response = await listApi.getAll({ status: true });
    dispatch({
      type: todoListActions.setLists.type,
      payload: response,
    });
  };

  const fetchCard = async (body: {}) => {
    const response = await cardApi.getAll(body);
    dispatch({
      type: todoListActions.setCards.type,
      payload: response,
    });
  };

  const addList = async (body: TListCreate) => {
    try {
      const response = await listApi.create(body);
      if (response) setShowInputAddList(false);
      fetchList();
    } catch (err) {
      console.log("Failed to create new List", err);
    }
  };

  const onFinish = (values: any) => {
    const data: TListCreate = { name: values.titleInput, status: true };
    addList(data);
  };

  useEffect(() => {
    fetchList();
    fetchCard({ status: true });
  }, []);

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
              {lists.map((list, index) => (
                <Column
                  key={list.id}
                  id={list.id}
                  title={list.name}
                  cards={cards.filter((card) => card.list_id === list.id)}
                  index={index}
                  isScrollable={withScrollableColumns}
                  isCombineEnabled={isCombineEnabled}
                  useClone={provided}
                ></Column>
              ))}
              <ColumnContainer>
                <CustomAddListBlock $show={showInputAddList}>
                  {!showInputAddList ? (
                    <CustomSpan onClick={() => setShowInputAddList(true)}>
                      <PlusOutlined /> Thêm danh sách khác
                    </CustomSpan>
                  ) : (
                    <Form onFinish={onFinish}>
                      <Form.Item name="titleInput">
                        <Input placeholder="Nhập tiêu đề danh sách..." />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Thêm danh sách
                        </Button>
                        <Button
                          type="ghost"
                          style={{ marginLeft: `${grid}px` }}
                          onClick={() => setShowInputAddList(false)}
                        >
                          <CloseOutlined />
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </CustomAddListBlock>
              </ColumnContainer>
              {provided.placeholder}
            </BoardContainer>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
