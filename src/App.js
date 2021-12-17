import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";
import ChatBubble from "./components/ChatBubble";
import ChatHeader from "./components/ChatHeader";
import ChatLoading from "./components/ChatLoading";
import QuestionCardMCQ from "./components/QuestionCardMCQ";
import QuestionCardShort from "./components/QuestionCardShort";
import TextBox from "./components/TextBox";
import { postMCQ, postShortQuestion } from "./services/questions";


function App() {

  const [convStarter, setConvStarter] = useState([
    'Hi, I am OTTO',
    'I can ask you questions, help your revise and test your knowledge.',
    'You can start by putting link in the text box.'
  ])
  const [convStarterIndex, setConvStarterIndex] = useState(0)
  const [questionType, setQuestionType] = useState('')
  const [inputText, setInputText] = useState('')
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleQuestionType = (event) => {
    setQuestionType(event.target.value)
    setQuestions([])
    setInputText('')
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
    }else if(questionType === 'short_question'){
      postShortQuestion(inputText).then(response => {
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
        p={2}
        overflowY={'scroll'}
        spacing={5}
      >
        <ChatLoading />
        <ChatBubble text={convStarter[0]} />
        {
          questionType === 'mcq' && questions?.questions?.length > 0 && 
          questions.questions.map((q, idx) => (
            <QuestionCardMCQ
              key={idx}
              question={q.question_statement}
              options={q.options}
              answer={q.answer}
            />
          ))
        }

        {
          questionType === 'short_question' && questions?.questions?.length > 0 &&
          questions.questions.map((q) => (
            <QuestionCardShort 
              key={q.id}
              question={q.Question}
              answer={q.Answer}
            />
          ))
        }
      </VStack>
      <TextBox 
        isLoading={isLoading} 
        getQuestion={getQuestion} 
        handleInputText={handleInputText}
        inputText={inputText}
      />
    </Box>
  );
}

export default App;
