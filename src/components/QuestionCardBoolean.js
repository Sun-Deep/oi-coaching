import { Button, Text,Icon, VStack } from "@chakra-ui/react"
import Swal from 'sweetalert2'
import { useState } from "react"
import { useSpeechSynthesis } from 'react-speech-kit';
import {BsVolumeDownFill} from 'react-icons/bs'
import { COLOR } from "../constants/color";

const QuestionCardBoolean = ({ 
    question, 
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
        bgColor={`${COLOR[color].bg}`}
        color={COLOR[color].color}

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
        <Button
         w='full'
         size={'sm'}
         fontSize={`${fontSize}px`}
         onClick={() => setAnswer('Yes')}
         textTransform={'capitalize'}
         bgColor={`${COLOR[color].bg}`}
         color={COLOR[color].color}
         boxShadow={'lg'}
        >
           Yes
        </Button>
        <Button
         w='full'
         size={'sm'}
         fontSize={`${fontSize}px`}
         onClick={() => setAnswer('No')}
         textTransform={'capitalize'}
         bgColor={`${COLOR[color].bg}`}
         color={COLOR[color].color}
         boxShadow={'lg'}
        >
           No
        </Button>
    </VStack>
}

export default QuestionCardBoolean