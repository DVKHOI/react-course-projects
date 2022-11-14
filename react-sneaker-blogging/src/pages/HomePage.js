import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase-config";
import styled from "styled-components";
import Header from "../components/layout/Header";

const HomePageStyles = styled.div``;
const HomePage = () => {
  // const handleLogout = () => {
  //   signOut(auth);
  //   console.log("log out");
  // };
  return (
    <HomePageStyles>
      <Header></Header>
    </HomePageStyles>
  );
};

export default HomePage;
