import React from 'react'
import styled from "styled-components"

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const SearchInput = styled.input`
  width: 70%;
 
`;

const SearchButton = styled.button`
  width: 30%;
  cursor: pointer;

  &:hover {
    background-color: blue;
  }
`;

const SearchBar = () => {
    return (
        <SearchBarWrapper>
            <SearchInput type="text" placeholder="Search..."/>
            <SearchButton>Search</SearchButton>
        </SearchBarWrapper>
    )
}

export default SearchBar