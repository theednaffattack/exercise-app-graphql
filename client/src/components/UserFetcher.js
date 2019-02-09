import React, { Component } from "react";
import { Box, Flex, Text } from "rebass";
import { Fetch } from "react-data-fetching";

import { Loader } from "./Loader";
import MissingQuery from "./MissingQuery";

class UserFetcher extends Component {
  render() {
    let { userId } = this.props;
    return (
      <Box py={3}>
        {userId ? (
          <Fetch
            method="POST"
            url={`/api/user?userId=${userId}`}
            timeout={5000}
            loader={<Loader />}
          >
            {({ data }) => (
              <Text color="white" as="h3" fontSize={3}>
                {data && data.username ? data.username : ""}

                {/* {JSON.stringify(data, null, 2)} */}
              </Text>
            )}
          </Fetch>
        ) : (
          <MissingQuery />
        )}
      </Box>
    );
  }
}
export default UserFetcher;
