import styled from "styled-components";
import { borderRadius, grid } from "../../../../../constants";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { getBackgroundColor } from "../../../styled";

export const imageSize = 40;

const getBackgroundAuthorColor = (
  isDragging: boolean,
  authorColors: {
    soft: any;
    hard: any;
  },
  isGroupedOver?: boolean
) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return "#EBECF0";
  }

  return "#FFFFFF";
};

const getBorderColor = (isDragging: boolean, authorColors: { hard: any }) =>
  isDragging ? authorColors.hard : "transparent";

const getInheritTransform = (
  inherit: DraggingStyle | NotDraggingStyle,
  isDragging: boolean
) => {
  return inherit && isDragging
    ? `${inherit.transform} rotate(5deg) !important`
    : "rotate(0deg)";
};

export const CloneBadge = styled.div`
  background: #79f2c0;
  bottom: ${grid / 2}px;
  border: 2px solid #57d9a3;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);
  height: ${imageSize}px;
  width: ${imageSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.a<{
  $isDragging: boolean;
  $isGroupedOver?: boolean;
  $colors: { hard: string; soft: string };
  $inherited: any;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  user-select: none;
  border: 2px solid transparent;
  box-sizing: border-box;
  border-radius: ${borderRadius}px;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  transform: ${(props) =>
    getInheritTransform(props.$inherited, props.$isDragging)};
  border-color: ${(props) => getBorderColor(props.$isDragging, props.$colors)};
  background-color: ${(props) =>
    getBackgroundAuthorColor(
      props.$isDragging,
      props.$colors,
      props.$isGroupedOver
    )};
  box-shadow: ${({ $isDragging }) =>
    $isDragging ? `2px 2px 1px #A5ADBA` : "1px 1px 1px #A5ADBA"};

  /* anchor overrides */
  color: #091e42;

  &:hover,
  &:active {
    color: #091e42;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.$colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

export const CustomEditBlock = styled.div`
  padding: ${grid};

  &:hover {
    ${() => getBackgroundColor(true, false)}
  }
`;

export const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

export const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;
