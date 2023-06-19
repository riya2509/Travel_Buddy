import React from "react";
import propTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";

function Card(props) {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    text-align: center;
    width: 500px;
    margin-bottom: 20px;
  `;
  const { description, fromPlace, toPlace, startDate, endDate, trainInfo } =
    props;
  return (
    <>
      <Container>
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
  fromPlace: propTypes.number,
  toPlace: propTypes.number,
  startDate: propTypes.string,
  endDate: propTypes.string,
  trainInfo: propTypes.number,
};
export default Card;
