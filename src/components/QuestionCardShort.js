import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import Swal from 'sweetalert2'
import { useRef, useState } from "react"

const QuestionCardShort = ({ question, answer, setQuestionCounter }) => {

    const [selectedAns, setSelectedAns] = useState('')
    const [isAnswered, setIsAnswered] = useState(false)

    const ansRef = useRef()

    const setAnswer = () => {
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

          

            

    </VStack>
}

export default QuestionCardShort