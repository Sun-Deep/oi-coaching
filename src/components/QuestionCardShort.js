import { Button, Flex, Icon, Input, Text, VStack } from "@chakra-ui/react"
import Swal from 'sweetalert2'
import {BsVolumeDownFill} from 'react-icons/bs'
import { useRef, useState } from "react"
import { useSpeechSynthesis } from 'react-speech-kit';

const QuestionCardShort = ({ question, answer, setQuestionCounter }) => {
    const { speak } = useSpeechSynthesis();
    const [selectedAns, setSelectedAns] = useState('')
    const [isAnswered, setIsAnswered] = useState(false)
    const [attempt, setAttempt] = useState(0)
    const ansRef = useRef()

    const setAnswer = () => {
        setAttempt(attempt => attempt + 1)
        setSelectedAns(ansRef.current.value)
        if(!isAnswered){
            setQuestionCounter(c => c + 1)
            setIsAnswered(true)
        }
        if(ansRef.current.value === answer){
            Swal.fire({
                icon: 'success',
                title: 'Well Done!',
                showConfirmButton: false,
                timer: 1500,
                width: '320px'
              })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Try Again!',
                showConfirmButton: false,
                timer: 1500,
                width: '320px'
              })
        }
    }


    return <VStack
        p={2}
        boxShadow={'md'}
        borderRadius={'lg'}
        spacing={2}
        w='full'
        border={
            selectedAns === answer ? '3px solid green'
            : (selectedAns !== '' && selectedAns !== answer) ? '3px solid red'
            : ''
        }
    >
        <Icon 
            alignSelf={'flex-end'} 
            as={BsVolumeDownFill} 
            cursor={'pointer'}
            w={6}
            h={6}
            onClick={() => speak({ text: question })}
        />
        <Text>{question}</Text>

        <Flex gridGap={2} w='full' alignItems={'center'}>
            <Input 
                borderRadius={'lg'}
                ref={ansRef}
            />
            <Button 
                size={'sm'}
                onClick={setAnswer}
            >
                Send
            </Button>
        </Flex>

        {
            attempt >= 3 &&  <Text color={'gray'} as='small'>
               Answer: {answer}
            </Text>
        }

    </VStack>
}

export default QuestionCardShort