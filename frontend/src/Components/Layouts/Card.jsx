import React from "react";
import propTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
`;

const TextField = styled.span`
  font-size: 15px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px inset #ebebeb;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-weight: 600;
  &.name {
    margin-left: 10px;
    flex: 1;
  }
`;
function Card(props) {
  const {
    description,
    fromPlace,
    toPlace,
    startDate,
    endDate,
    trainInfo,
    name,
    college,
  } = props;
  return (
    <>
      <Container>
        <Top>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 30, height: 30 }}>
            <TextField> {name[0]} </TextField>
          </Avatar>
          <Label className="name">{name}</Label>
          <Label>{college}</Label>
        </Top>
        Travelling From {fromPlace} to {toPlace}
        <br />
        Schedule: {moment(startDate).format("DD-MM-YYYY (dddd)")} -{" "}
        {moment(endDate).format("DD-MM-YYYY (dddd)")}
        <br />
        Train Number: {trainInfo}
        <br />
        {description}
      </Container>
    </>
  );
}
Card.propTypes = {
  id: propTypes.number,
  description: propTypes.string,
  fromPlace: propTypes.string,
  toPlace: propTypes.string,
  startDate: propTypes.string,
  endDate: propTypes.string,
  trainInfo: propTypes.number,
  name: propTypes.string,
  college: propTypes.string,
};
export default Card;
