import React from "react";
import styled from "styled-components";

import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SideBar from "./SideBar";

const GeneralPageLayout = ({ children, showSideBar, showNavBar }) => {
  return (
    <>
    <PageWrapper>
      <Header />
      {showNavBar && <NavBar />}
      <Main>
        {showSideBar && <SideBar />}
        <Content>{children}</Content>
      </Main>
    </PageWrapper>
      <Footer />
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
`;

const Content = styled.main`
  flex: 1;
`;

export default GeneralPageLayout;
