import React from "react";
import styled from "styled-components";

const SideBar = () => {
  return <SideBarWrapper>Sidebar</SideBarWrapper>;
};

const SideBarWrapper = styled.aside`
  width: 200px;
  border-right: 1px solid grey;
`;

export default SideBar;
