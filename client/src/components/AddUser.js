import React from "react";
import { Banner, Box, Flex, Heading, Text } from "rebass";
import styled from "styled-components";

import AddUserFormContainer from "./AddUserFormContainer";

const RoundedBanner = styled(Banner)`
  border-radius: 25px;
`;

const AddUser = props => (
  <Box bg="blue" color="white" p={4} width={[1]} style={{ minHeight: "100vh" }}>
    <Flex
      flexWrap="wrap"
      mx={-2}
      flexDirection="column"
      width="1024px"
      mx="auto"
    >
      <Heading f={[4, 5, 6, 7]}>Add User</Heading>
      <Box px={2} py={2} width="500px">
        <AddUserFormContainer />
      </Box>
    </Flex>
  </Box>
);

export default AddUser;
