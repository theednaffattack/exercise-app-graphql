import React from "react";
import { Box, Flex, Text } from "rebass";

const ShowExercisesToo = ({ exercises: { data } }) => (
  <Box>
    <Flex flexDirection="column" mx="auto" width={4 / 5}>
      <Flex flexDirection="row" flexWrap>
        {data.map(exercise => (
          <Box
            bg="white"
            color="blue"
            p={3}
            m={3}
            css={{ boxShadow: "5px 10px rgba(0,0,0,0.2);" }}
          >
            <Text color="black">{exercise.description}</Text>
            <Text>{exercise.duration}</Text>
            <Text>{exercise.createdAt}</Text>
            <Text> {exercise.updatedAt}</Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  </Box>
);

export { ShowExercisesToo };
