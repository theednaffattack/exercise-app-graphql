import React, { Component, Fragment } from "react";
import { Box, Flex, Text } from "rebass";
import { Fetch } from "react-data-fetching";
import queryString from "query-string";

import UserFetcher from "./UserFetcher";
import { Loader } from "./Loader";
import MissingQuery from "./MissingQuery";
import AddExerciseForm from "./AddExerciseForm";
import { ErrorModal } from "./ErrorModal";
// import { ShowExercises } from "./ShowExercises";
import { ShowExercisesToo } from "./ShowExercisesToo";
import { space } from "rebass/dist/theme";

export class ExerciseFetcher extends Component {
  state = {
    isLoadingMore: false,
    userId: queryString.parse(this.props.passProps.location.search).userId,
    pathname: this.props.passProps.location.pathname,
    search: this.props.passProps.location.search,
    fetchUrl:
      this.props.passProps.location.pathname +
      this.props.passProps.location.search,
    exercises: undefined,
    start: 0,
    limit: 20,
    from: null,
    to: null,
    errors: []
  };

  loadMoreExercises = () => {
    console.log("`loadMoreExercises` executed");
    this.setState(() => ({ isLoadingMore: true }));
  };

  saveData = data => {
    this.setState(state => ({
      isLoadingMore: false,
      exercises: { ...state.exercises, ...data },
      start: state.start + 20,
      limit: state.limit + 20
    }));
  };

  renderContent = ({ error, data }) => {
    return error ? (
      <ErrorModal message={error} />
    ) : (
      // <span>spoof error, i guess</span>
      <ShowExercisesToo
        exercises={this.state.exercises}
        pathname={this.state.pathname}
        isLoadingMore={this.state.isLoadingMore}
        search={this.props.passProps.search}
        onLoadMore={this.loadMoreExercises}
      />
      // <span>show exercises will go here</span>
    );
  };

  reportError = error => {
    /* You can handle your error here */
    this.setState(() => ({ errors: errors.concat({ error }) }));
  };
  render() {
    // let {
    //   location: { pathname, search }
    // } = this.props.passProps;
    let { userId, search, pathname, fetchUrl } = this.state;
    return (
      <Fragment>
        {userId ? (
          <Box width={1 / 2} mx="auto" mt="3">
            <UserFetcher userId={userId} />
            <AddExerciseForm
              onLoadMore={this.loadMoreExercises}
              userId={userId}
              onError={({ error }) => this.reportError(error)}
            />
          </Box>
        ) : (
          <MissingQuery />
        )}
        {search ? (
          <Fetch
            method="GET"
            url={`/api${fetchUrl}`}
            timeout={5000}
            loader={<Loader color="rainbow" />}
            onLoad={() => console.log("Started fetching excercise data...")}
            onError={({ error }) => this.reportError(error)}
            refetch={this.state.isLoadingMore}
            onFetch={this.saveData}
            render={this.renderContent}
          />
        ) : (
          <span>whaaaaaaa</span>
        )}
      </Fragment>
    );
  }
}
