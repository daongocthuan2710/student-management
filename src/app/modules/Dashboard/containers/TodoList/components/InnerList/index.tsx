import React from "react";

// Types
import { TQuote } from "../../type";

// Styled
import { CustomTitle } from "../../styled";
import {
  CustomContainer,
  DropZone,
} from "../../dnd/components/QuoteList/styled";

// Components
import { InnerQuoteList } from "../InnerQuoteList";

export const InnerList = (props: {
  title?: string;
  quotes: TQuote[];
  dropProvided?: any;
}) => {
  const { quotes, dropProvided } = props;
  const title = props.title ? <CustomTitle>{props.title}</CustomTitle> : null;

  return (
    <CustomContainer>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </DropZone>
    </CustomContainer>
  );
};
