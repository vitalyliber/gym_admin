import useSWR from "swr";
import { sentences } from "../../api/english";
import { commonFetch } from "../../api/commonFetch";
import { Box, Flex, Text, Checkbox } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Verbs() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id ? sentences(id) : null, commonFetch);

  if (!data) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {data.data.list.map(
        ({
          en,
          ru,
          form,
          irregular_pack: { base, past_tense, past_participle },
          active,
        }) => (
          <Flex
            borderWidth={1}
            marginX={4}
            marginY={3}
            paddingY={2}
            paddingX={3}
            borderRadius={10}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Flex>
                <Text
                  color={form === "base" ? "green.500" : "blackAlpha.700"}
                  fontWeight={form === "base" ? 600 : 400}
                  marginRight={2}
                >
                  {base}
                </Text>
                -
                <Text
                  color={form === "past_tense" ? "green.500" : "blackAlpha.700"}
                  fontWeight={form === "past_tense" ? 600 : 400}
                  marginRight={2}
                  marginLeft={2}
                >
                  {past_tense}
                </Text>
                -
                <Text
                  color={
                    form === "past_participle" ? "green.500" : "blackAlpha.700"
                  }
                  fontWeight={form === "past_participle" ? 600 : 400}
                  marginLeft={2}
                >
                  {past_participle}
                </Text>
              </Flex>
              <Text fontSize={20}>{en}</Text>
              <Text color="gray.400" fontSize={14}>
                {ru}
              </Text>
            </Box>
            <Box>
              <Checkbox isChecked={active} defaultIsChecked />
            </Box>
          </Flex>
        )
      )}
    </Box>
  );
}
