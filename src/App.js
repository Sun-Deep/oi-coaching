import { Box, Button, Flex, Icon, Select, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
import { HiArrowLeft } from 'react-icons/hi'
import { BiFontSize } from 'react-icons/bi'

import { ChatBubbleReceived, ChatBubbleSent } from "./components/ChatBubble";
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

  const [chats, setChats] = useState([])
  const [questionType, setQuestionType] = useState('')
  const [inputText, setInputText] = useState('')
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [paragraphs, setParagraphs] = useState([])
  const [questionCounter, setQuestionCounter] = useState(0)
  const [paraIndex, setParaIndex] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [isReport, setIsReport] = useState(false)
  const [isQuestionType, setIsQuestionType] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [fontSizee, setFontSizee] = useState(12)

  const handleQuestionType = (event) => {
    setIsLoading(true)
    setQuestions('')
    setQuestionType(event.target.value)
    getQuestions(event.target.value)
  }

  const handleInputText = (event) => {
    setInputText(event.target.value)
  }

  const getParagraphs = (event) => {
    if(event){
      event.preventDefault()
    }
    setIsLoading(true)
    setChats([...chats, { sent: inputText}])
    getResponse(inputText).then(async (res) => {
      if(res?.data?.paragraphs){
        let para = res?.data?.paragraphs
        setParagraphs(para)
        setIsLoading(false)
        setIsQuestionType(true)
      }else{
        setChats([...chats, {sent: inputText}, { received: res?.data?.response}])
        setIsLoading(false)
      }
      setInputText('')
    })
  }

  const populateQuestions = (res) => {
    console.log(questions)
    setQuestions((questions) => {
      if(questions.length > 0){
        return [...questions, res.data]
      }else{
        return [res.data]
      }
    })
    setTotalQuestions(value => value + res?.data?.questions?.length)
    setParaIndex(idx => idx + 1)
  }

  const getQuestions = (questionType) => {
    if(paraIndex <= paragraphs.length && !isProcessing){
      setIsProcessing(true)
      if(questionType === 'boolean'){
        postBoolean(paragraphs[paraIndex]).then(res => {
          setIsLoading(false)
          setIsProcessing(false)
          populateQuestions(res)
         
        })  
      }else if(questionType === 'mcq'){
        postMCQ(paragraphs[paraIndex]).then(res => {
          setIsLoading(false)
          setIsProcessing(false)
          populateQuestions(res)
        })  
      }else if(questionType === 'short_question'){
        postShortQuestion(paragraphs[paraIndex]).then(res => {
          setIsLoading(false)
          setIsProcessing(false)
          populateQuestions(res)
        })  
      }
    }
    
  }

  useEffect(() => {
    if(totalQuestions > 0){
      let per = (questionCounter / (totalQuestions))
      console.log({per})
      if(per >= 0.6){
        getQuestions(questionType)
      }
    }
  }, [questionCounter])

  const handleFontSize = () => {

    if(fontSizee < 18){
      setFontSizee(f => f + 1)
    }
  }

  const reset = () => {
    setChats([])
    setQuestionType('')
    setInputText('')
    setQuestions([])
    setIsLoading(false)
    setParagraphs([])
    setQuestionCounter(0)
    setParaIndex(0)
    setTotalQuestions(0)
    setIsReport(false)
    setIsQuestionType(false)
    setIsProcessing(false)
    setFontSizee(12)
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
        <ChatHeader />
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
               !!c.sent ?  <ChatBubbleSent fontSize={fontSizee} key={idx} text={c.sent} /> :
                <ChatBubbleReceived fontSize={fontSizee} key={idx} text={c.received} />
              ))
            }
            { isQuestionType && <Select
                placeholder="Select Question Type"
                border={'2px solid'}
                onChange={handleQuestionType}
                value={questionType}
            >
                <option value={'boolean'}>Boolean (True or False)</option>
                <option value={'mcq'}>MCQ</option>
                <option value={'short_question'}>Short Question</option>
            </Select>}
            { isLoading && <ChatLoading />}
          </VStack>

          {
            questionType === 'mcq' && questions.length > 0 &&
            questions.map(ques => {
              if(ques?.questions?.length > 0){
                return ques.questions.map((q, idx) => (
                  <QuestionCardMCQ
                    key={idx}
                    question={q.question_statement}
                    options={shuffleArray([...q['options'], q.answer])}
                    answer={q.answer}
                    setQuestionCounter={setQuestionCounter}
                    fontSize={fontSizee}
                  />
                ))
              }
            })
          }


          {
            questionType === 'short_question' && questions.length > 0 &&
            questions.map(ques => {
              if(ques?.questions?.length > 0){
                return ques.questions.map((q) => (
                  <QuestionCardShort 
                    key={q.id}
                    question={q.Question}
                    answer={q.Answer}
                    setQuestionCounter={setQuestionCounter}
                    fontSize={fontSizee}
                  />
                ))
              }
            })
          }

          {
            questionType === 'boolean' && questions.length > 0 &&
            questions.map((ques, index) => {
              if(ques?.questions?.length > 0){
                return ques.questions.map((q, idx) => (
                  <QuestionCardBoolean
                  key={idx}
                  question={q}
                  answer={questions[index]['answers'][idx]}
                  setQuestionCounter={setQuestionCounter}
                  fontSize={fontSizee}
                />
                ))
              }
            })
          }
        </VStack>
        <Box pos={'absolute'} bottom={2} w='full'>
          <TextBox 
            getQuestion={getParagraphs} 
            handleInputText={handleInputText}
            inputText={inputText}
          />
          <Flex alignItems={'center'} gridGap={3}>
          <Button
            size={'xs'}
            bgColor={'#4dd4b9'}
            color={'black'}
            boxShadow={'lg'}
            ml={2}
            onClick={() => setIsReport(true)}
          >
            Show Report
          </Button>

        
        <Icon
          as={BiFontSize} 
          w={6}
          h={6}
          justifyItems={'flex-end'}
          cursor={'pointer'}
          onClick={handleFontSize}
        />

        <Button
          size={'xs'}
          bgColor={'red'}
          color={'white'}
          boxShadow={'lg'}
          ml={2}
          onClick={reset}
        >
          Reset
        </Button>
          </Flex>
          
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
