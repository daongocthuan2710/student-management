// Libs
import styled from "styled-components";
import { colors } from "@atlaskit/theme";

// Constants
import { borderRadius, grid } from "./constants";

// Imgs
import { coffeeBackgroundImg } from "../../../../../assets/todoList";

export const BoardContainer = styled.div`
  /* background-color: ${colors.B100}; */
  background: url(${coffeeBackgroundImg.default}) no-repeat;
  background-size: cover;
  min-height: 100%;
  min-width: 100%;
  display: inline-flex;
`;

export const ColumnContainer = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

export const ColumnHeader = styled.div<{ $isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${(props) => (props.$isDragging ? colors.G50 : colors.N30)};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;

// $ExpectError - not sure why
export const CustomTitle = styled.h4<{ $isDragging?: boolean }>`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid #998dd9;
    outline-offset: 2px;
  }
`;
