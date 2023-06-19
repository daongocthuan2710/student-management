/* eslint-disable jsx-a11y/anchor-is-valid */
// Libs
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

// Atnd
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Modal,
  Space,
  Spin,
} from "antd";
import { CloseOutlined, DashOutlined, PlusOutlined } from "@ant-design/icons";

// Types
import { Card } from "../../../../../../../models";
import { TCardCreate } from "../../../type";

// Constants
import { DROP_TYPE, GRID } from "../../../constants";

// Styled
import {
  ColumnContainer,
  ColumnFooter,
  ColumnHeader,
  CustomTitle,
} from "../../../styled";
import { CustomAddCardBlock, CustomSpanCard, CustomWrapper } from "../styled";
import { CustomSettingBlock, ScrollContainer } from "./styled";

// Components
import { InnerList } from "./InnerList";

// Hooks
import { useUpdateList } from "../../../../../../../queries/TodoList/List/useUpdateList";
import { useCreateCard } from "../../../../../../../queries/TodoList/Card/useCreateCard";
import { useGetCards } from "../../../../../../../queries/TodoList/Card/useGetCards";

export interface ColumnProps {
  id: string;
  title: string;
  index: number;
  isScrollable: boolean;
  isCombineEnabled: boolean;
  useClone: any;
}

const Column = ({
  id,
  title,
  index,
  isCombineEnabled,
  isScrollable,
}: ColumnProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInputAddCard, setShowInputAddCard] = useState<boolean>(false);
  const [isInputEditOpen, setIsInputEditOpen] = useState<boolean>(false);

  // List hooks
  const { mutateAsync: updateListMutateAsync, isLoading: isUpdateListLoading } =
    useUpdateList();

  // Card hooks
  const { data: cardsData } = useGetCards({
    filterSetting: { list_id: id },
  });

  const cards = cardsData || [];

  const { mutateAsync: createCardMutateAsync, isLoading: isCreateCardLoading } =
    useCreateCard();

  const handleOk = async () => {
    try {
      const response = await updateListMutateAsync({
        id: id,
        body: { status: false },
      });
      if (response) setIsModalOpen(false);
    } catch (err) {
      console.log("Failed to delete list", err);
    }
  };

  const onAddNewCard = async (values: any) => {
    try {
      const newCard: TCardCreate = {
        list_id: id,
        title: values.titleInput,
        description: "",
        status: true,
      };

      const response = await createCardMutateAsync(newCard);
      if (response) setShowInputAddCard(false);
    } catch (err) {
      console.log("Faild to create new card: ", err);
    }
  };

  const onEditSave = async (values: any) => {
    try {
      const body = {
        name: values.titleInput as string,
      };

      const response = await updateListMutateAsync({
        id: id,
        body: body,
      });

      if (response) setIsInputEditOpen(false);
    } catch (err) {
      console.log("Faid to update list", err);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <a onClick={() => setIsInputEditOpen(true)}>Chỉnh sửa danh sách</a>
      ),
      key: "0",
    },
    {
      label: <a onClick={() => setIsModalOpen(true)}>Xóa danh sách</a>,
      key: "1",
    },
  ];

  return (
    <>
      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => (
          <ColumnContainer ref={provided.innerRef} {...provided.draggableProps}>
            <ColumnHeader $isDragging={snapshot.isDragging}>
              <CustomTitle
                $isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                aria-label={`${title} list`}
              >
                {!isInputEditOpen ? (
                  <>{title}</>
                ) : (
                  <Form onFinish={onEditSave} style={{ width: "100%" }}>
                    <Form.Item initialValue={title} name="titleInput">
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isUpdateListLoading}
                      >
                        {isUpdateListLoading && (
                          <>
                            <Spin /> &ensp;
                          </>
                        )}
                        Lưu danh sách
                      </Button>
                      <Button
                        type="ghost"
                        style={{ marginLeft: `${GRID}px` }}
                        onClick={() => setIsInputEditOpen(false)}
                      >
                        <CloseOutlined />
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </CustomTitle>

              <CustomSettingBlock>
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <a color="black">
                    <Space>
                      <DashOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </CustomSettingBlock>
            </ColumnHeader>

            <Droppable
              droppableId={id}
              type={DROP_TYPE.CARD}
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
                      <InnerList cards={cards} dropProvided={dropProvided} />
                    </ScrollContainer>
                  ) : (
                    <InnerList cards={cards} dropProvided={dropProvided} />
                  )}
                </CustomWrapper>
              )}
            </Droppable>

            <ColumnFooter>
              <CustomAddCardBlock $show={showInputAddCard}>
                {!showInputAddCard ? (
                  <CustomSpanCard onClick={() => setShowInputAddCard(true)}>
                    <PlusOutlined /> Thêm thẻ
                  </CustomSpanCard>
                ) : (
                  <Form onFinish={onAddNewCard} style={{ width: "100%" }}>
                    <Form.Item name="titleInput">
                      <Input placeholder="Nhập tiêu đề cho thẻ này..." />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isCreateCardLoading}
                      >
                        {isCreateCardLoading && (
                          <>
                            <Spin /> &ensp;
                          </>
                        )}
                        Thêm thẻ
                      </Button>
                      <Button
                        type="ghost"
                        style={{ marginLeft: `${GRID}px` }}
                        onClick={() => setShowInputAddCard(false)}
                      >
                        <CloseOutlined />
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </CustomAddCardBlock>
            </ColumnFooter>
          </ColumnContainer>
        )}
      </Draggable>

      <Modal
        title="Xóa danh sách này?"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={isUpdateListLoading}
        onCancel={() => setIsModalOpen(false)}
        width={250}
      ></Modal>
    </>
  );
};

export default React.memo(Column);
