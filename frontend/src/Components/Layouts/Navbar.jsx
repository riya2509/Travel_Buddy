import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #6400a0;
  padding: 12px;
`;

const Label = styled.div`
  margin-right: 10px;
  background-color: #ebebeb;
  padding: 10px;
  border-radius: 6px;
  font-weight: 700;
`;

const LeftContainer = styled.span`
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  text-decoration: underline;
  color: #fff;
`;

const RightContainer = styled.div`
  margin-right: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function Navbar() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    toast.success("Logged Out successfully! 😀");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const getUserProfile = () => {
    axios
      .get("/api/me")
      .then((response) => {
        setName(response.data.data[0].name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Container>
        <LeftContainer>Travel Buddy</LeftContainer>
        <RightContainer>
          <Label
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          >
            Hello {name}!
          </Label>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </RightContainer>
      </Container>
    </>
  );
}

export default Navbar;
