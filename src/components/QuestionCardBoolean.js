import { Button, Text, VStack } from "@chakra-ui/react"
import Swal from 'sweetalert2'
import { useState } from "react"

const QuestionCardBoolean = ({ question, answer }) => {

    const [selectedAns, setSelectedAns] = useState('')

    const setAnswer = (value) => {
        setSelectedAns(value)
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
        <Text>{question}</Text>
        <Button
         w='full'
         size={'sm'}
         onClick={() => setAnswer('Yes')}
         textTransform={'capitalize'}
        >
           Yes
        </Button>
        <Button
         w='full'
         size={'sm'}
         onClick={() => setAnswer('No')}
         textTransform={'capitalize'}
        >
           No
        </Button>
    </VStack>
}

export default QuestionCardBoolean