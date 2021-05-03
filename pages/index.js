import Image from "next/image";
import axios from "axios";
import { Flex, Input, Heading, Button, Box, useToast } from "@chakra-ui/react";
import { authorize } from "../api/sessions";
import { useRouter } from "next/router";

export default function Home() {
  const toast = useToast();
  const router = useRouter();
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const {
        data: { token },
      } = await authorize({
        username: event.target.name.value,
        password: event.target.password.value,
      });
      localStorage.setItem("token", token);
      axios.defaults.headers.common["token"] = token;
      router.push("/verbs");
    } catch (e) {
      console.log(e.message);
      toast({
        title: "Username or password is not correct.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="papayawhip"
    >
      <Box padding={4} flexDirection="column">
        <Flex mb={5} width="100%" justifyContent="center">
          <Flex
            width={150}
            height={150}
            bg="white"
            borderRadius="full"
            overflow="hidden"
            alignItems="center"
            justifyContent="center"
          >
            <Image width={100} height={100} src="/akatsuki.webp" />
          </Flex>
        </Flex>
        <Heading textAlign="center" mb={8}>
          Secure inc.
        </Heading>
        <form onSubmit={signIn}>
          <Input
            name="name"
            autoComplete="name"
            bg="white"
            placeholder="Name"
            isRequired
          />
          <Input
            name="password"
            autoComplete="current-password"
            mt={3}
            bg="white"
            placeholder="Password"
            isRequired
            type="password"
          />
          <Button type="submit" width="100%" mt={8} colorScheme="red">
            Sign in
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
