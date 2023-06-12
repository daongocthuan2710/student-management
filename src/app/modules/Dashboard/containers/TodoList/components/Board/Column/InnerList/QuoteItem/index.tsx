/* eslint-disable jsx-a11y/anchor-is-valid */
// Libs
import React, { useState } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

// Types
import { Card } from "../../../../../../../../../models";

// Styled
import { BlockQuote, Container, Content, CustomEditBlock } from "./styled";
import { colors } from "@atlaskit/theme";
import { CloseOutlined, DashOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, MenuProps, Modal, Space } from "antd";
import { grid } from "../../../../../constants";
import { cardApi } from "../../../../../../../../../../api/todoList/cardApi";
import { todoListActions } from "../../../../../slice";
import { useAppDispatch } from "../../../../../../../../../hooks/hooks";

function QuoteItem(props: {
  card: Card;
  provided: DraggableProvided;
  dragSnapshot: DraggableStateSnapshot;
  style?: any;
  index?: number;
}) {
  const { card, provided, style, index, dragSnapshot } = props;
  const [isInputEditOpen, setIsInputEditOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  function getStyle(provided: DraggableProvided, style: any) {
    if (!style) {
      return provided.draggableProps.style;
    }
    return {
      ...provided.draggableProps.style,
      ...style,
    };
  }

  const items: MenuProps["items"] = [
    {
      label: <a onClick={() => setIsInputEditOpen(true)}>Chỉnh sửa thẻ</a>,
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

  const onFinish = async (values: any) => {
    try {
      const body = {
        title: values.titleInput as string,
      };

      const response = await cardApi.update({
        id: card.id,
        list_id: card.list_id,
        body: body,
      });
      if (response) setIsInputEditOpen(false);
      fetchCard();
    } catch (err) {
      console.log("Faid to update card", err);
      setIsInputEditOpen(false);
    }
  };

  const handleOk = async () => {
    try {
      const response = await cardApi.update({
        id: card.id,
        list_id: card.list_id,
        body: { status: false },
      });
      const cards = await cardApi.getAll({ status: true });
      dispatch(todoListActions.setCards(cards));
      if (response) setIsModalOpen(false);
    } catch (err) {
      setIsModalOpen(false);
      console.log("Failed to delete card", err);
    }
  };

  return (
    <>
      <Container
        $isDragging={dragSnapshot.isDragging}
        $isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
        $colors={{
          soft: colors.P50,
          hard: colors.N400A,
        }}
        $inherited={
          provided.draggableProps.style ? provided.draggableProps.style : ""
        }
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getStyle(provided, style)}
        data-is-dragging={dragSnapshot.isDragging}
        data-testid={card.id}
        data-index={index}
        // aria-label={`${quote.author.name} quote ${quote.content}`}
      >
        {!isInputEditOpen ? (
          <>
            <Content>
              <BlockQuote>{card.title}</BlockQuote>
            </Content>
            <CustomEditBlock>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a color="black">
                  <Space>
                    <EditOutlined />
                  </Space>
                </a>
              </Dropdown>
            </CustomEditBlock>
          </>
        ) : (
          <Form onFinish={onFinish} style={{ width: "100%" }}>
            <Form.Item name="titleInput">
              <Input defaultValue={card.title} />
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
      </Container>
      <Modal
        title="Xóa thẻ này?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={250}
      ></Modal>
    </>
  );
}

export default React.memo(QuoteItem);
