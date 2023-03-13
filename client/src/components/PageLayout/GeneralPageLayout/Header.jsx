import React from "react";
import styled from "styled-components";

import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <HeaderWrapper>
      <div>logo</div>
      <SearchBar />
      <div>cart</div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export default Header;
