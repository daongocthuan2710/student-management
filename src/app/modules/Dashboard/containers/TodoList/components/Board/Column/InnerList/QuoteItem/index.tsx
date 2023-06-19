/* eslint-disable jsx-a11y/anchor-is-valid */
// Libs
import React, { useState } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { colors } from "@atlaskit/theme";

// Antd
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
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

// Types
import { Card } from "../../../../../../../../../models";

// Styled
import { BlockQuote, Container, Content, CustomEditBlock } from "./styled";

// Constants
import { GRID } from "../../../../../constants";

// Hooks
import { useUpdateCard } from "../../../../../../../../../queries/TodoList/Card/usUpdateCard";

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

  // Card hooks
  const { mutateAsync: updateCardMutateAsync, isLoading: isUpdateCardLoading } =
    useUpdateCard();

  function getStyle(provided: DraggableProvided, style: any) {
    if (!style) {
      return provided.draggableProps.style;
    }
    return {
      ...provided.draggableProps.style,
      ...style,
    };
  }

  const onEditCard = async (values: any) => {
    try {
      const body = {
        title: values.titleInput as string,
      };

      const response = await updateCardMutateAsync({
        id: card.id,
        list_id: card.list_id,
        body: body,
      });
      if (response) setIsInputEditOpen(false);
    } catch (err) {
      console.log("Faid to update card", err);
    }
  };

  const handleOk = async () => {
    try {
      const response = await updateCardMutateAsync({
        id: card.id,
        list_id: card.list_id,
        body: { status: false },
      });
      if (response) setIsModalOpen(false);
    } catch (err) {
      console.log("Failed to delete card", err);
    }
  };

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
                <Space color="black">
                  <EditOutlined />
                </Space>
              </Dropdown>
            </CustomEditBlock>
          </>
        ) : (
          <Form onFinish={onEditCard} style={{ width: "100%" }}>
            <Form.Item name="titleInput">
              <Input defaultValue={card.title} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isUpdateCardLoading}
              >
                {isUpdateCardLoading && (
                  <>
                    <Spin /> &ensp;
                  </>
                )}
                Lưu thẻ
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
      </Container>
      <Modal
        title="Xóa thẻ này?"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={isUpdateCardLoading}
        onCancel={() => setIsModalOpen(false)}
        width={250}
      ></Modal>
    </>
  );
}

export default React.memo(QuoteItem);
