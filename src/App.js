import { Box, Button, Flex, Icon, Image, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
import { HiArrowLeft } from 'react-icons/hi'

import ChatBubble from "./components/ChatBubble";
import ChatHeader from "./components/ChatHeader";
import ChatLoading from "./components/ChatLoading";
import QuestionCardMCQ from "./components/QuestionCardMCQ";
import QuestionCardShort from "./components/QuestionCardShort";
import TextBox from "./components/TextBox";
import { postMCQ, postShortQuestion } from "./services/questions";
import bar from "./mockup/bar";


function App() {

  const [convStarter, setConvStarter] = useState([
    '',
    'Hi, I am OTTO. Your friend and personal learning partner.',
    'I can ask you questions, help your revise and test your knowledge.',
    'You can start by selecting question type from top and putting link in the text box.'
  ])
  const [convStarterIndex, setConvStarterIndex] = useState(0)
  const [questionType, setQuestionType] = useState('')
  const [inputText, setInputText] = useState('')
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isReport, setIsReport] = useState(false)

  useEffect(() => {
    if(convStarterIndex < 3){
      setTimeout(() => {
        setConvStarterIndex(idx => idx + 1)
      }, 2000)
    }
    
  }, [convStarterIndex])

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
      boxShadow={'md'}
      h='93vh'
      w='450px'
      mx={'auto'}
      my={5}
      borderRadius={'lg'}
    >
       <Box w='250px' pos={'absolute'} top={0} left={10}>
        <Image objectFit={'contain'} src="/logo.png" />
      </Box>
      {
        !isReport ? <Box>
        <ChatHeader questionType={questionType} handleQuestionType={handleQuestionType} />
        <VStack
          h='63vh'
          p={2}
          overflowY={'scroll'}
          spacing={5}
          w='full'
        >
          <VStack
            spacing={2}
            align={'flex-start'}
            w='full'
            // marginLeft={'-40px'}
          >
          {
            convStarterIndex > 0 && <ChatBubble text={convStarter[1]} />
          }

          {
            convStarterIndex > 1 && <ChatBubble text={convStarter[2]} />
          }

          {
            convStarterIndex > 2 && <ChatBubble text={convStarter[3]} />
          }

          {
            convStarterIndex < 3 &&  <ChatLoading />
          }
        </VStack>
        
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
