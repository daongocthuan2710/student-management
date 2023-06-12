/* eslint-disable jsx-a11y/anchor-is-valid */
// Libs
import { Draggable, Droppable } from "react-beautiful-dnd";

// Types
import { Card } from "../../../../../../../models";
import { TCardCreate } from "../../../type";

// Constants
import { DROP_TYPE, grid } from "../../../constants";
import { Button, Dropdown, Form, Input, MenuProps, Modal, Space } from "antd";
import { CloseOutlined, DashOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

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

// APIs
import { listApi } from "../../../../../../../../api/todoList";
import { cardApi } from "../../../../../../../../api/todoList/cardApi";

// Hooks
import { useAppDispatch } from "../../../../../../../hooks/hooks";

// Slices
import { todoListActions } from "../../../slice";

export interface ColumnProps {
  id: string;
  title: string;
  cards: Card[];
  index: number;
  isScrollable: boolean;
  isCombineEnabled: boolean;
  useClone: any;
}

const Column = ({
  id,
  title,
  cards,
  index,
  isCombineEnabled,
  isScrollable,
}: ColumnProps) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInputAddCard, setShowInputAddCard] = useState<boolean>(false);
  const [isInputEditOpen, setIsInputEditOpen] = useState<boolean>(false);

  const handleOk = async () => {
    try {
      const response = await listApi.update({
        id: id,
        body: { status: false },
      });
      const lists = await listApi.getAll({ status: true });
      dispatch(todoListActions.setLists(lists));
      if (response) setIsModalOpen(false);
    } catch (err) {
      setIsModalOpen(false);
      console.log("Failed to delete list", err);
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

  const fetchCard = async () => {
    const response = await cardApi.getAll({ status: true });
    dispatch({
      type: todoListActions.setCards.type,
      payload: response,
    });
  };

  const fetchList = async () => {
    const response = await listApi.getAll({ status: true });
    dispatch({
      type: todoListActions.setLists.type,
      payload: response,
    });
  };

  const onFinish = async (values: any) => {
    try {
      const newCard: TCardCreate = {
        list_id: id,
        title: values.titleInput,
        description: "",
        status: true,
      };

      const response = await cardApi.create(newCard);
      if (response) setShowInputAddCard(false);
      fetchCard();
    } catch (err) {
      console.log("Faild to create new card: ", err);
      setShowInputAddCard(false);
    }
  };

  const onEditSave = async (values: any) => {
    try {
      const body = {
        name: values.titleInput as string,
      };

      const response = await listApi.update({
        id: id,
        body: body,
      });
      if (response) setIsInputEditOpen(false);
      fetchList();
    } catch (err) {
      console.log("Faid to update list", err);
      setIsInputEditOpen(false);
    }
  };
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
                    <Form.Item name="titleInput">
                      <Input defaultValue={title} />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Lưu
                      </Button>
                      <Button
                        type="ghost"
                        style={{ marginLeft: `${grid}px` }}
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
                  <Form onFinish={onFinish} style={{ width: "100%" }}>
                    <Form.Item name="titleInput">
                      <Input placeholder="Nhập tiêu đề cho thẻ này..." />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Thêm thẻ
                      </Button>
                      <Button
                        type="ghost"
                        style={{ marginLeft: `${grid}px` }}
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
        onCancel={() => setIsModalOpen(false)}
        width={250}
      ></Modal>
    </>
  );
};

export default Column;
