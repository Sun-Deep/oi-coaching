import { Button, Text,Icon, VStack } from "@chakra-ui/react"
import Swal from 'sweetalert2'
import { useSpeechSynthesis } from 'react-speech-kit';
import {BsVolumeDownFill} from 'react-icons/bs'
import { useState } from "react"

const QuestionCard = ({ question, options, answer, setQuestionCounter }) => {
    const { speak } = useSpeechSynthesis();
    const [selectedAns, setSelectedAns] = useState('')
    const [isAnswered, setIsAnswered] = useState(false)

    const setAnswer = (value) => {
        setSelectedAns(value)
        if(!isAnswered){
            setQuestionCounter(c => c + 1)
            setIsAnswered(true)
        }
        if(value === answer){
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

        {
            options && options.length > 0 &&
            options.map((op, idx) => (
                <Button
                    w='full'
                    size={'sm'}
                    key={idx}
                    textTransform={'capitalize'}
                    onClick={() => setAnswer(op)}
                >
                    {op}
                </Button>
            ))
        }
        {/* <Button
         w='full'
         size={'sm'}
         onClick={() => setAnswer(answer)}
         textTransform={'capitalize'}
        >
            {answer}
        </Button> */}
    </VStack>
}

export default QuestionCard