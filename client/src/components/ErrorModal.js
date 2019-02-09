import React, { Component } from "react";
import { Box, Flex, Text } from "rebass";

export const ErrorModal = props => (
  <Flex bg="blue" style={{ minHeight: "100vh" }} flexDirection="column">
    <Text color="white">Error of some kind</Text>
  </Flex>
);
