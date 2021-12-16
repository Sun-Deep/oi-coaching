import { Box, VStack } from "@chakra-ui/react";
import ChatHeader from "./components/ChatHeader";
import TextBox from "./components/TextBox";


function App() {
  return (
    <Box
      // bgColor='blackAlpha.100'
      boxShadow={'md'}
      h='90vh'
      w='450px'
      mx={'auto'}
      my={10}
      borderRadius={'lg'}
    >
      <ChatHeader />
      <VStack
        h='70vh'
      >

      </VStack>
      <TextBox />
    </Box>
  );
}

export default App;
