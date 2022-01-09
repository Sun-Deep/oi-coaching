import { Button, Text,Icon, VStack } from "@chakra-ui/react"
import Swal from 'sweetalert2'
import { useSpeechSynthesis } from 'react-speech-kit';
import {BsVolumeDownFill} from 'react-icons/bs'
import { useState } from "react"
import { COLOR } from "../constants/color";

const QuestionCard = ({ 
    question, 
    options, 
    answer, 
    setQuestionCounter, 
    fontSize,
    color
}) => {
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
        bgColor={`${COLOR[color].bg}`}
        color={COLOR[color].color}
        boxShadow={'md'}
        borderRadius={'lg'}
        spacing={2}
        w='full'
        fontSize={`${fontSize}px`}
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
            onClick={() => speak({ text: question + options.join(',') })}
        />
        <Text>{question}</Text>

        {
            options && options.length > 0 &&
            options.map((op, idx) => (
                <Button
                    w='full'
                    size={'sm'}
                    fontSize={`${fontSize}px`}
                    key={idx}
                    textTransform={'capitalize'}
                    bgColor={`${COLOR[color].bg}`}
                    color={COLOR[color].color}
                    onClick={() => setAnswer(op)}
                    boxShadow={'lg'}
                >
                    {op}
                </Button>
            ))
        }
    </VStack>
}

export default QuestionCard