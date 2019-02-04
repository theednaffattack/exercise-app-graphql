import React, { Component } from "react";
import { Box, Flex, Text } from "rebass";
import { Fetch } from "react-data-fetching";
import queryString from "query-string";
import axios from "axios";

let whatevs = queryString.parse(window.location);

const FETCH_STATE = {
  INITIAL: "initial",
  LOADING: "loading",
  IS_FETCHING: "isFetching",
  IS_LOADED: "is_loaded",
  ERROR: "error"
};

class ExerciseLog extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      message: { text: "Sample message" },
      fetchState: FETCH_STATE.INITIAL,
      errors: this.props.errors,
      search: this.props.search
    };
  }

  handleClick(e) {
    e.preventDefault();
    console.log(e);
  }
  render() {
    return (
      <div>
        <ExerciseFetcher passProps={this.props} />
      </div>
    );
  }
}

export class ExerciseFetcher extends Component {
  render() {
    let {
      location: { pathname, search }
    } = this.props.passProps;
    let parsedSearch = queryString.parse(search);
    return (
      <div>
        {pathname ? (
          <Fetch method="GET" url={"/api" + pathname + search}>
            {({ data }) => (
              <Flex flexDirection="column">
                <UserFetcher userId={parsedSearch.userId} />
                <h1 style={{ color: "white" }}> Exercises</h1>
                {data ? (
                  <Flex flexDirection="row">
                    {data.map(exercise => (
                      <Box bg="white" color="blue" p={3} m={3}>
                        <Text color="black">{exercise.description}</Text>
                        <Text>{exercise.duration}</Text>
                        <Text>{exercise.createdAt}</Text>
                        <Text> {exercise.updatedAt}</Text>
                      </Box>
                    ))}
                  </Flex>
                ) : (
                  "loading..."
                )}
              </Flex>
            )}
          </Fetch>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export class UserFetcher extends Component {
  render() {
    let { userId } = this.props;
    return (
      <Text color="white">
        {userId ? (
          <Fetch method="POST" url={`/api/user?userId=${userId}`}>
            {({ data }) => data.username}
          </Fetch>
        ) : (
          <span>waiting for userId loading...</span>
        )}
      </Text>
    );
  }
}
export default ExerciseLog;
