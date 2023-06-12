// Libraries
import { Card, Col, Row } from "antd";

// Components
import Board from "./components/Board";

export interface TodoListProps {}

export function TodoList(props: TodoListProps) {
  return (
    <>
      <Row className="justify-content-center text-center">
        <Col xs={12}>
          <Card>
            <h2>Todo List App</h2>
          </Card>
        </Col>
      </Row>
      <Board withScrollableColumns />
    </>
  );
}
