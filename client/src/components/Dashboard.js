import React from "react";
// import { render } from "react-dom";
// import SignIn from "./SignIn";
// import { Router, Link } from "@reach/router";

import styled from "styled-components";

const StyledH1 = styled.h1`
  color: green;
`;

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>

    <StyledH1>This is CSS-in-JS </StyledH1>
    {/* <SignIn /> */}
  </div>
);

export default Dashboard;
