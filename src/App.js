import { Box, Button, calc, Flex, Icon, Image, Select, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { BiFontSize } from 'react-icons/bi'

import { ChatBubbleReceived, ChatBubbleSent } from "./components/ChatBubble";
import ChatHeader from "./components/ChatHeader";
import ChatLoading from "./components/ChatLoading";
import QuestionCardMCQ from "./components/QuestionCardMCQ";
import QuestionCardShort from "./components/QuestionCardShort";
import TextBox from "./components/TextBox";
import { getResponse, postBoolean, postMCQ, postShortQuestion } from "./services/questions";
import QuestionCardBoolean from "./components/QuestionCardBoolean";
import shuffleArray from "./helper/shuffleArray";
import Report from "./components/Report";
import BottomAction from "./components/BottomAction";
import { BG_COLOR } from "./constants/color";


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
  const [color, setColor] = useState('light')
  const [background, setBackground] = useState('light_one')

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

  const increaseFontSize = () => {
    if(fontSizee < 18){
      setFontSizee(f => f + 1)
    }
  }

  const decreaseFontSize = () => {
    if(fontSizee > 12){
      setFontSizee(f => f - 1)
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

  const handleColorChange = (event) => {
    setColor(event.target.value)
  }

  const handleBackground = (bg) => {
    setBackground(bg)
    if(bg === 'light_one' || 'light_two'){
      setColor('light')
    }
  }
  
  console.log(color)

  return (
    <Box
      boxShadow={'md'}
      h={['95%', '90%', '670px']}
      w={['full', 'full', '450px']}
      mx={'auto'}
      borderRadius={'lg'}
      pos={'relative'}
      bgColor={BG_COLOR[background]}
    >
      {
        !isReport ? <Box height={'100%'}>
        <ChatHeader />
        <VStack
        style={{
          height: 'calc(100% - 180px)'
        }}
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
               !!c.sent ?  <ChatBubbleSent 
                color={color} 
                fontSize={fontSizee} 
                key={idx} 
                text={c.sent} 
              /> :
                <ChatBubbleReceived 
                  color={color} 
                  fontSize={fontSizee} 
                  key={idx} 
                  text={c.received} 
                />
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
                    color={color}
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
                    color={color}
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
                  color={color}
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
            background={background}
          />

         <BottomAction 
          decreaseFontSize={decreaseFontSize}
          increaseFontSize={increaseFontSize}
          reset={reset}
          handleColorChange={handleColorChange}
          setIsReport={setIsReport}
          background={background}
          handleBackground={handleBackground}
         />
        </Box>
        
      </Box> : <Report setIsReport={setIsReport} />
    }
    </Box>
  );
}

export default App;
