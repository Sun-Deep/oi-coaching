import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import TextBox from "./components/TextBox";
import { postMCQ } from "./services/questions";


function App() {

  const [questionType, setQuestionType] = useState('')
  const [inputText, setInputText] = useState('')
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleQuestionType = (event) => {
    setQuestionType(event.target.value)
  }

  const handleInputText = (event) => {
    setInputText(event.target.value)
  }

  console.log(questions)
  console.log(questionType)
  console.log(inputText)

  const getQuestion = () => {
    setIsLoading(true)
    if(questionType === 'boolean'){

    }else if(questionType === 'mcq'){
      postMCQ(inputText).then((response) => {
        setQuestions(response.data)
        setIsLoading(false)
      })
    }
  }
  
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
      <TextBox 
        isLoading={isLoading} 
        getQuestion={getQuestion} 
        handleInputText={handleInputText} 
      />
    </Box>
  );
}

export default App;
