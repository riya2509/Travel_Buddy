import React from "react";
import propTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import toast from "react-hot-toast";
// import StarRateIcon from '@mui/icons-material/StarRate';

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

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.$isTravelling ? "green" : "grey")};
  border-radius: 50%;
  margin-left: 10px;
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

const TravelDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TravelDetailsLeft = styled.div`
  flex: 1;
`;

function Card(props) {
  const {
    index,
    setData,
    description,
    id,
    fromPlace,
    toPlace,
    startDate,
    endDate,
    trainInfo,
    name,
    college,
    likedByCurrentUser,
    likes,
  } = props;

  const handleLike = (id) => {
    console.log(id);

    axios
      .get(`/api/like?post_Id=${id}`)
      .then((response) => {
        const { status, message, isLiked } = response.data;
        if (status === 1) {
          setData((prevData) => {
            console.log(isLiked);

            const value = [...prevData];
            value[index].likedByCurrentUser = isLiked ? 1 : 0;
            value[index].likes = isLiked
              ? value[index].likes + 1
              : value[index].likes - 1;
            return value;
          });
          toast.success(`${message} 🙂`);
        } else {
          toast.error(`${message} 😥`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Container>
        <Top>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 30, height: 30 }}>
            <TextField> {name[0]} </TextField>
          </Avatar>
          <Label className="name">{name}</Label>
          <Label>{college}</Label>
          <Dot $isTravelling={moment().isSame(moment(startDate), "day")}></Dot>
        </Top>
        <TravelDetails>
          <TravelDetailsLeft>
            Travelling From {fromPlace} to {toPlace}
          </TravelDetailsLeft>
          ({likes})
          {likedByCurrentUser ? (
            <StarIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleLike(id)}
            />
          ) : (
            <StarOutlineIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleLike(id)}
            />
          )}
        </TravelDetails>
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
  likes: propTypes.number,
  likedByCurrentUser: propTypes.number,
  setData: propTypes.func,
  index: propTypes.number,
};
export default Card;
