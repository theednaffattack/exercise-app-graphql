import React, { Component } from "react";
import { Box, Flex, Text } from "rebass";
import { Link } from "@reach/router";

class MissingQuery extends Component {
  render() {
    return (
      <Flex alignItems="center" justifyContent="center" bg="blue" p={4}>
        <Text as="h1" fontSize={[3]} color="white">
          <Link to="/api/exercises/newUser" style={{ color: "yellow" }}>
            Click here
          </Link>{" "}
          to register
        </Text>
      </Flex>
    );
  }
}

export default MissingQuery;
