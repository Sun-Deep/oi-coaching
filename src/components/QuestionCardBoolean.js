import { Button, Text, VStack } from "@chakra-ui/react"
import { useState } from "react/cjs/react.development"

const QuestionCardBoolean = ({ question, answer }) => {

    const [selectedAns, setSelectedAns] = useState('')

    const setAnswer = (value) => {
        setSelectedAns(value)
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