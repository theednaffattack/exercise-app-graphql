import React, { Component } from "react";
import { Box, Flex, Text } from "rebass";
import { Fetch } from "react-data-fetching";

import { Loader } from "./Loader";

export const ShowExercises = props => (
  <Flex bg="blue" style={{ minHeight: "100vh" }} flexDirection="column">
    <Text color="white">Peak at state of `ExerciseFetcher`</Text>
    {/* <pre style={{ color: "white" }}>{JSON.stringify(this.state, null, 2)}</pre> */}
    {props.search && props.search.userId ? (
      <Box width={1 / 2} mx="auto" mt="3">
        <UserFetcher userId={props.search.userId} />
        <AddExerciseForm userId={props.search.userId} />
      </Box>
    ) : (
      <MissingQuery />
    )}
    {props.search ? (
      <Fetch
        method="GET"
        url={"/api" + props.pathname + props.search}
        timeout={5000}
        loader={<Loader color="rainbow" />}
        onLoad={() => console.log("Started fetching data...")}
        onError={({ error }) => this.reportError(error)}
        refetch={this.state.isLoadingMore}
        onFetch={this.saveData}
      >
        {({ data }) => (
          <Flex flexDirection="column" px="3">
            <Box width="1" color="white">
              <h1 style={{ color: "white" }}> Exercises</h1>
              {data && data.length ? (
                <Flex flexDirection="row" mx="auto" width={4 / 5}>
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
                <Flex flexDirection="row" width={1 / 2} mx="auto">
                  <Text>Let's get started! Add an exercise above.</Text>
                </Flex>
              )}
            </Box>
          </Flex>
        )}
      </Fetch>
    ) : (
      ""
    )}
  </Flex>
);
