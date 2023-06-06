import styled from "styled-components";
import { grid } from "../../../constants";

const scrollContainerHeight = 500;

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
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

export const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean
) => {
  if (isDraggingOver) {
    return "#FFEBE6";
  }
  if (isDraggingFrom) {
    return "#E6FCFF";
  }
  return "#EBECF0";
};

export const DropZone = styled.div`
  min-height: ${scrollContainerHeight}px;
  height: auto;
  padding-bottom: ${grid}px;
`;

export const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

/* stylelint-disable block-no-empty */
export const CustomContainer = styled.div``;
