// Libraries
import { Card, Col, Row } from "antd";

// Components
import Board from "./components/Board";

// Utils
import { generateQuoteMap } from "./utils";

export interface TodoListProps {}

export function TodoList(props: TodoListProps) {
  const data = {
    medium: generateQuoteMap(12),
    large: generateQuoteMap(500),
  };

  return (
    <>
      <Row className="justify-content-center text-center">
        <Col xs={12}>
          <Card>
            <h2>Todo List App</h2>
          </Card>
        </Col>
      </Row>
      <Board initial={data.medium} withScrollableColumns />
    </>
  );
}
