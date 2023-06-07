// Libs
import styled from "styled-components";
import { colors } from "@atlaskit/theme";

// Constants
import { borderRadius, grid } from "./constants";

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
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  border-radius: ${borderRadius}px;
`;

export const ColumnHeader = styled.div<{ $isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${colors.N30};
  transition: background-color 0.2s ease;
  /* &:hover {
    background-color: ${colors.G50};
  } */
`;

export const ColumnFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${grid}px;
  border-bottom-left-radius: ${borderRadius}px;
  border-bottom-right-radius: ${borderRadius}px;
  background-color: ${colors.N30};
  transition: background-color 0.2s ease;
  /* &:hover {
    background-color: ${colors.G50};
  } */
`;

// $ExpectError - not sure why
export const CustomTitle = styled.h4<{ $isDragging?: boolean }>`
  padding: ${grid * 2}px;
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
