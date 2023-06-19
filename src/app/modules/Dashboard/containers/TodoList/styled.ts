// Libs
import styled from "styled-components";
import { colors } from "@atlaskit/theme";

// Constants
import { BORDER_RADIUS, GRID } from "./constants";

// Imgs
import { coffeeBackgroundImg } from "../../../../../assets/todoList";

export const BoardContainer = styled.div`
  /* background-color: ${colors.B100}; */
  background-size: cover;
  height: 100%;
  width: 100%;
  display: inline-flex;
  padding: 10px;
  overflow-x: scroll;
  background: url(${coffeeBackgroundImg.default}) fixed;
`;

export const ColumnContainer = styled.div`
  margin: ${GRID}px;
  display: flex;
  flex-direction: column;
  border-radius: ${BORDER_RADIUS}px;
`;

export const ColumnHeader = styled.div<{ $isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${BORDER_RADIUS}px;
  border-top-right-radius: ${BORDER_RADIUS}px;
  background-color: ${colors.N30};
  transition: background-color 0.2s ease;
  /* &:hover {
    background-color: ${colors.G50};
  } */
`;

export const ColumnFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${GRID}px;
  padding-top: 0;
  border-bottom-left-radius: ${BORDER_RADIUS}px;
  border-bottom-right-radius: ${BORDER_RADIUS}px;
  background-color: ${colors.N30};
  transition: background-color 0.2s ease;
  /* &:hover {
    background-color: ${colors.G50};
  } */
`;

// $ExpectError - not sure why
export const CustomTitle = styled.h4<{ $isDragging?: boolean }>`
  padding: ${GRID * 2}px;
  margin: 0;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid #998dd9;
    outline-offset: 2px;
  }
`;
