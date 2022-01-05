import { Box, Button, Flex, Icon, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
import { HiArrowLeft } from 'react-icons/hi'

import ChatBubble from "./components/ChatBubble";
import ChatHeader from "./components/ChatHeader";
import ChatLoading from "./components/ChatLoading";
import QuestionCardMCQ from "./components/QuestionCardMCQ";
import QuestionCardShort from "./components/QuestionCardShort";
import TextBox from "./components/TextBox";
import { getResponse, postBoolean, postMCQ, postShortQuestion } from "./services/questions";
import bar from "./mockup/bar";
import QuestionCardBoolean from "./components/QuestionCardBoolean";
import shuffleArray from "./helper/shuffleArray";


function App() {

  // const [convStarter, setConvStarter] = useState([
  //   '',
  //   'Hi, I am OTTO. Your friend and personal learning partner.',
  //   'I can ask you questions, help your revise and test your knowledge.',
  //   'You can start by selecting a question type from the top.',
  //   'And paste  the link or the text of your learning material into the text box below.'
  // ])

  const [chats, setChats] = useState([])
  // const [convStarterIndex, setConvStarterIndex] = useState(0)
  const [questionType, setQuestionType] = useState('')
  const [inputText, setInputText] = useState('')
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isReport, setIsReport] = useState(false)

  // useEffect(() => {
  //   if(convStarterIndex < 4){
  //     setTimeout(() => {
  //       setConvStarterIndex(idx => idx + 1)
  //     }, 2000)
  //   }
    
  // }, [convStarterIndex])

  const handleQuestionType = (event) => {
    setQuestionType(event.target.value)
    setQuestions([])
    setInputText('')
  }

  const handleInputText = (event) => {
    setInputText(event.target.value)
  }

  const getQuestion = () => {
    setIsLoading(true)
    setChats([...chats, { sent: inputText}])
    getResponse(inputText).then(res => {
      if(res?.data?.paragraph){
        setIsLoading(false)

      }else{
        setChats([...chats, {sent: inputText}, { received: res?.data?.response}])
        setIsLoading(false)

      }
      setInputText('')
    })
    // if(questionType === 'boolean'){
    //   postBoolean(inputText).then(response => {
    //     setQuestions(response.data)
    //     setIsLoading(false)
    //   })
    // }else if(questionType === 'mcq'){
    //   postMCQ(inputText).then((response) => {
    //     setQuestions(response.data)
    //     setIsLoading(false)
    //   })
    // }else if(questionType === 'short_question'){
    //   postShortQuestion(inputText).then(response => {
    //     setQuestions(response.data)
    //     setIsLoading(false)
    //   })
    // }
  }
  
  return (
    <Box
      boxShadow={'md'}
      h='670px'
      w='450px'
      mx={'auto'}
      borderRadius={'lg'}
      pos={'relative'}
    >
      {
        !isReport ? <Box>
        <ChatHeader questionType={questionType} handleQuestionType={handleQuestionType} />
        <VStack
          h='444px'
          p={2}
          overflowY={'scroll'}
          spacing={5}
          w='full'
        >
          <VStack
            spacing={2}
            align={'flex-start'}
            w={'full'}
          >
            {
              chats.length > 0 && chats.map((c, idx) => (
               !!c.sent ?  <ChatBubble alignSelf='flex-end' key={idx} text={c.sent} /> :
                <ChatBubble key={idx} text={c.received} />
              ))
            }
            { isLoading && <ChatLoading />}
          </VStack>
        
          {
            questionType === 'mcq' && questions?.questions?.length > 0 && 
            questions.questions.map((q, idx) => (
              <QuestionCardMCQ
                key={idx}
                question={q.question_statement}
                options={shuffleArray([...q['options'], q.answer])}
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

          {
            questionType === 'boolean' && questions?.questions?.length > 0 &&
            questions.questions.map((q, idx) => (
              <QuestionCardBoolean
                key={idx}
                question={q}
                answer={questions['answers'][idx]}
              />
            ))
          }
        </VStack>
        <Box pos={'absolute'} bottom={2} w='full'>
        <TextBox 
          // isLoading={isLoading} 
          getQuestion={getQuestion} 
          handleInputText={handleInputText}
          inputText={inputText}
        />

        <Button
          size={'sm'}
          bgColor={'#4dd4b9'}
          color={'black'}
          boxShadow={'lg'}
          ml={2}
          onClick={() => setIsReport(true)}
        >
          Show Report
        </Button>
        </Box>
        
      </Box> :
      <Box w='100%'>
         <Icon m={2} w={10} h={10} as={HiArrowLeft} color={'#4dd4b9'} onClick={() => setIsReport(false)} />
         <Flex
            mt={10}
            mb={10}
            w='550px'
            p={2}
            justifyContent={'center'}
          >
        <Box w='100%' h='500px'>
          <ResponsiveBar
            data={bar}
            keys={[ 'time' ]}
            indexBy="question"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'time'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Questions',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Time Spent',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
          />
        </Box>
      </Flex>
      </Box>
      }
    </Box>
  );
}

export default App;
