import React from "react";
import styled from "styled-components";

//temp
const categories = [
  "Home",
  "Fitness",
  "LifeStyle",
  "Entertainment",
  "Pets",
  "Medical",
  "Industrial",
  "Gaming",
];

const NavBar = () => {
  return (
    <NavWrapper>
      {categories.map((category, i) => (
        <div key={i}>{category}</div>
      ))}
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
`;

export default NavBar;
