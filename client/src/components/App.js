import React, { Component } from "react";
import { Box, Flex, Heading, Position, Provider, Text } from "rebass";
import posed, { PoseGroup } from "react-pose";
import { Router, Link, Location } from "@reach/router";
import { injectGlobal, styled } from "styled-components";

import theme from "../styles/theme";
import "../styles/App.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
// import Exercises from "./Exercises";
import AddExercise from "./AddExercise";
import { ExerciseLog } from "./ExerciseLog";
import AddUser from "./AddUser";

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0;
    height: 100vh; }
  #root {
    height: 100vh;
  }
`;

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          color: isCurrent ? "red" : "blue",
          paddingBottom: "3px",
          borderBottom: isCurrent ? "4px goldenrod solid" : undefined,
          margin: "4px 8px 2px 0",
          textDecoration: "none",
          fontSize: "1.3rem"
        }
      };
    }}
  />
);

class App extends Component {
  render() {
    return (
      <Provider theme={theme}>
        <Flex
          flexDirection="column"
          flex="auto"
          bg="violet"
          m={0}
          style={{ minHeight: "100vh" }}
        >
          <Box flex={1} color="text" bg="gray" width={[1]}>
            <Box flex={1} color="text" width="1024px" mx="auto" mb={3}>
              <Heading>Exercise Tracker</Heading>
              <NavLink to="/api/exercises/newUser">Home</NavLink>{" "}
              {/* <NavLink to="dashboard">Dashboard</NavLink>{" "}
              <NavLink to="api/exercise">Exercise</NavLink>{" "}
              <NavLink to="api/exercises/newUser">User</NavLink>{" "}
              <NavLink to="api/exercises/add">Add Exercise</NavLink>
              <NavLink to="exercise/log">Log</NavLink> */}
            </Box>
            <PosedRouter>
              <Home path="/" />
              <Dashboard path="dashboard" />
              <AddExercise path="api/exercises/add" />
              <AddUser path="api/exercises/newUser" />
              <ExerciseLog path="exercise/log" />
            </PosedRouter>
          </Box>
        </Flex>
      </Provider>
    );
  }
}

export default App;
