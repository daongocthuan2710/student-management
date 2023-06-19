/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// Libs
import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

// Antd
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";

// Styled
import { BoardContainer, ColumnContainer } from "../../styled";
import { CustomAddListBlock, CustomSpan } from "./styled";

// Components
import Column from "./Column";

// Types
import { Card, List, TListCreate } from "../../../../../../models";
import { TCardChange, TListChange } from "../../types";

// Utils
import { reorder, swapPosition } from "../../utils";

// Constants
import { DROP_TYPE, GRID } from "../../constants";
import { TODOLIST_ACTIONS } from "../../slice/sagaActions";

// Hooks
import { useAppDispatch } from "../../../../../../hooks/hooks";
import { useGetCards } from "../../../../../../queries/TodoList/Card/useGetCards";
import { useGetLists } from "../../../../../../queries/TodoList/List/useGetLists";

// Slices
import { useCreateList } from "../../../../../../queries/TodoList/List/useCreateList";
import { useUpdateManyList } from "../../../../../../queries/TodoList/List/useUpdateManyList";
import { useUpdateManyCard } from "../../../../../../queries/TodoList/Card/useUpdateManyCard";
import { QUERY_KEYS } from "../../../../../../../constants/queries";
import { useQueryClient } from "@tanstack/react-query";

export interface BoardProps {
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
}

const Board = ({
  withScrollableColumns = false,
  isCombineEnabled = false,
}: BoardProps) => {
  const queryClient = useQueryClient();

  // List Hooks
  const { data: listsData } = useGetLists({
    filterSetting: {},
  });
  const { mutateAsync: listMutateAsync, isLoading: isCreateListLoading } =
    useCreateList();

  const { mutateAsync: updateManyListMutateAsync } = useUpdateManyList();
  const lists = listsData || [];
  console.log("lists: ", lists);

  // Card Hooks
  const { mutateAsync: updateManyCardMutateAsync } = useUpdateManyCard();

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
        const dataChange: TListChange = {
          id: lists[source.index].id,
          body: {
            position: destination.index,
          },
          params: {
            old_position: source.index,
          },
        };

        const listsAfterSwap: List[] = reorder(
          lists,
          source.index,
          destination.index
        );

        queryClient.setQueryData(
          [
            QUERY_KEYS.GET_LISTS,
            { _order: "asc", _sort: "position", status: true },
          ],
          listsAfterSwap
        );

        updateManyListMutateAsync(dataChange);
        return;
      }

      // moving to same list
      if (source.droppableId === destination.droppableId) {
        const currentCards: Card[] =
          queryClient.getQueryData([
            QUERY_KEYS.GET_CARDS,
            {
              _order: "asc",
              _sort: "position",
              list_id: source.droppableId,
              status: true,
            },
          ]) || [];

        const cardChange: TCardChange = {
          id: currentCards[source.index].id,
          old_list_id: source.droppableId,
          body: {
            position:
              currentCards[destination.index].position || destination.index,
            list_id: destination.droppableId,
          },
          params: {
            old_position: currentCards[source.index].position,
          },
        };

        const cardsAfterSwap: Card[] = reorder(
          currentCards,
          source.index,
          destination.index
        );

        queryClient.setQueryData(
          [
            QUERY_KEYS.GET_CARDS,
            {
              _order: "asc",
              _sort: "position",
              list_id: source.droppableId,
              status: true,
            },
          ],
          cardsAfterSwap
        );

        updateManyCardMutateAsync(cardChange);
      } else {
        // moving to different list
        const currentCards: Card[] =
          queryClient.getQueryData([
            QUERY_KEYS.GET_CARDS,
            {
              _order: "asc",
              _sort: "position",
              list_id: source.droppableId,
              status: true,
            },
          ]) || [];

        const nextCards: Card[] =
          queryClient.getQueryData([
            QUERY_KEYS.GET_CARDS,
            {
              _order: "asc",
              _sort: "position",
              list_id: destination.droppableId,
              status: true,
            },
          ]) || [];

        const cardStart = currentCards[source.index];
        cardStart.list_id = destination.droppableId;

        const cardEnd = nextCards[destination.index];

        currentCards.splice(source.index, 1);
        nextCards.splice(destination.index, 0, cardStart);

        queryClient.setQueryData(
          [
            QUERY_KEYS.GET_CARDS,
            {
              _order: "asc",
              _sort: "position",
              list_id: source.droppableId,
              status: true,
            },
          ],
          currentCards
        );

        queryClient.setQueryData(
          [
            QUERY_KEYS.GET_CARDS,
            {
              _order: "asc",
              _sort: "position",
              list_id: destination.droppableId,
              status: true,
            },
          ],
          nextCards
        );

        const cardChange: TCardChange = {
          id: cardStart.id,
          old_list_id: source.droppableId,
          body: {
            position: cardEnd.position || destination.index,
            list_id: destination.droppableId,
          },
          params: {
            old_position: cardStart.position,
          },
        };

        updateManyCardMutateAsync(cardChange);
      }
    } catch (err) {
      console.log("Can not change position", err);
    }
  };

  const addList = async (body: TListCreate) => {
    try {
      const response = await listMutateAsync(body);

      if (response) setShowInputAddList(false);
    } catch (err) {
      console.log("Failed to create new List", err);
    }
  };

  const onFinish = (values: any) => {
    const data: TListCreate = { name: values.titleInput, status: true };
    addList(data);
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
              {lists
                ? lists.map((list, index) => (
                    <Column
                      key={list.id}
                      id={list.id}
                      title={list.name}
                      index={index}
                      isScrollable={withScrollableColumns}
                      isCombineEnabled={isCombineEnabled}
                      useClone={provided}
                    ></Column>
                  ))
                : ""}
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
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={isCreateListLoading}
                        >
                          {isCreateListLoading && (
                            <>
                              <Spin /> &ensp;
                            </>
                          )}
                          Thêm danh sách
                        </Button>
                        <Button
                          type="ghost"
                          style={{ marginLeft: `${GRID}px` }}
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
