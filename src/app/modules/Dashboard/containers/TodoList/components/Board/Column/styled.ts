import styled from "styled-components";
import { GRID } from "../../../constants";
import { getBackgroundColor } from "../styled";

const scrollContainerHeight = 500;

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

export const CustomSettingBlock = styled.div`
  margin-right: ${GRID}px;
  padding: ${GRID}px;
  border-radius: ${GRID}px;
  background-color: none;

  &:hover {
    background-color: ${() => getBackgroundColor(true, false)};
  }

  & a {
    color: black;
    font-size: 15px;
  }
`;
