import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import TextBox from "./components/TextBox";
import { postBoolean } from "./services/questions";


function App() {

  const [questionType, setQuestionType] = useState('')

  const handleQuestionType = (event) => {
    setQuestionType(event.target.value)
  }

  useEffect(() => {
    postBoolean('If an object remains a magnet even when removed from the other magnetic field it is called a permanent magnet. If alignment is made in the presence of a permanent magnetic field, the object is a temporary magnet. If the material is not magnetized in the presence of another magnetic field because the domains are randomly organized so that the north and south poles do not line up and often cancel each other it is non-magnetic.')
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
      <ChatHeader handleQuestionType={handleQuestionType} />
      <VStack
        h='63vh'
      >

      </VStack>
      <TextBox />
    </Box>
  );
}

export default App;
