import { Box, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import ChatHeader from "./components/ChatHeader";
import TextBox from "./components/TextBox";
import { postBoolean } from "./services/questions";


function App() {

  useEffect(() => {
    postBoolean()
  }, [])
  
  return (
    <Box
      // bgColor='blackAlpha.100'
      boxShadow={'md'}
      h='90vh'
      w='450px'
      mx={'auto'}
      my={5}
      borderRadius={'lg'}
    >
      <ChatHeader />
      <VStack
        h='63vh'
      >

      </VStack>
      <TextBox />
    </Box>
  );
}

export default App;
