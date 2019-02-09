import React from "react";
import { Flex } from "rebass";
import queryString from "query-string";
import { ExerciseFetcher } from "./ExerciseFetcher";

let whatevs = queryString.parse(window.location);

const FETCH_STATE = {
  INITIAL: "initial",
  LOADING: "loading",
  IS_FETCHING: "isFetching",
  IS_LOADED: "is_loaded",
  ERROR: "error"
};

export class ExerciseLog extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      message: { text: "Sample message" },
      fetchState: FETCH_STATE.INITIAL,
      errors: this.props.errors,
      search: this.props.search,
      reach: this.props
    };
  }

  handleClick(e) {
    e.preventDefault();
    console.log(e);
  }
  render() {
    return (
      <Flex bg="blue" style={{ minHeight: "100vh" }} flexDirection="column">
        <ExerciseFetcher passProps={this.props} />
      </Flex>
    );
  }
}

// export default ExerciseLog;
