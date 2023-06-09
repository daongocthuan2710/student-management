import styled from "styled-components";

// Constants
import { GRID } from "../../constants";

export const CustomWrapper = styled.div<{
  $isDraggingOver: boolean;
  $isDraggingFrom: boolean;
  $isDropDisabled: any;
}>`
  background-color: ${(props) =>
    getBackgroundColor(props.$isDraggingOver, props.$isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ $isDropDisabled }) => ($isDropDisabled ? 0.5 : "inherit")};
  padding: ${GRID}px;
  border: ${GRID}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

export const CustomAddListBlock = styled.div<{ $show: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ $show }) =>
    $show ? getBackgroundColor(false, false) : null};
  padding: ${GRID}px;
  border: ${GRID}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
  border-radius: ${GRID}px;
`;

export const CustomAddCardBlock = styled.div<{ $show: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $show }) =>
    $show ? getBackgroundColor(false, false) : null};
  padding: ${GRID}px;
  border: ${GRID}px;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 100%;
  border-radius: ${GRID}px;

  &:hover {
    background-color: ${() => getBackgroundColor(true, false)};
  }
`;

export const CustomSpan = styled.span`
  font-weight: 500;
  color: #172b4d;
  cursor: pointer;
`;

export const CustomSpanCard = styled.span`
  font-weight: 500;
  color: #172b4d;
  cursor: pointer;
`;

export const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean
) => {
  if (isDraggingOver) {
    return "#e1e2e5";
  }
  if (isDraggingFrom) {
    return "#E6FCFF";
  }
  return "#EBECF0";
};
