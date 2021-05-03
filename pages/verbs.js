import useSWR from "swr";
import { verbs } from "../api/english";
import { commonFetch } from "../api/commonFetch";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function Verbs() {
  const { data } = useSWR(verbs, commonFetch);

  if (!data) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {data.data.list.map(({ id, base, past_tense, past_participle }) => {
        return (
          <Box
            cursor="pointer"
            paddingY={2}
            paddingX={3}
            margin={2}
            borderWidth={1}
            key={id}
            borderRadius={10}
          >
            <Flex>
              <Text
                fontWeight="500"
                color="green.500"
                fontSize={20}
                paddingRight={2}
              >
                {base}
              </Text>{" "}
              - {past_tense} - {past_participle}
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
}
