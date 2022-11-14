import React from "react";
import styled from "styled-components";

const AuthentiPageStyles = styled.div`
  height: 100vh;
  padding: 40px;
  user-select: none;

  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 60px;
    color: ${(props) => props.theme.primary};
  }
  .main {
    display: flex;
  }
  .main-login_img {
    width: 700px;
    height: 650px;
  }
  .main-input {
    width: 70%;
    margin-top: 20px;
    margin-right: 5px;
    padding-right: 5px;
  }
  .has-account {
    margin-bottom: 20px;
    font-size: 14px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthentiPageStyles>
      <div className="container">
        <img srcSet="/logo.png " alt="" className="logo" />
        <h1 className="heading">Sneaker Blogging</h1>
        <div className="main">{children}</div>
      </div>
    </AuthentiPageStyles>
  );
};

export default AuthenticationPage;
