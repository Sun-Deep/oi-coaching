import { Box } from "@chakra-ui/layout";

function ChatLoading() {
  return (
    <Box w="5em" h="2em" pos="relative" p="10px" ml="5px" alignSelf='flex-start'>
      <Box className="typing__dot"></Box>
      <Box className="typing__dot"></Box>
      <Box className="typing__dot"></Box>
    </Box>
  );
}

export default ChatLoading;