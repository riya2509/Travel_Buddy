import { Button } from "@mui/material";
import React from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: aliceblue;
  padding: 12px;
`;

const LeftContainer = styled.div`
  flex: 1;
`;

const RightContainer = styled.div`
  margin-right: 12px;
`;

function Navbar() {
  const handleLogout = () => {
    window.localStorage.clear();
    toast.success("Logged Out successfully! 😀");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <Container>
      <LeftContainer>Travel Buddy</LeftContainer>
      <RightContainer>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </RightContainer>
    </Container>
  );
}

export default Navbar;
