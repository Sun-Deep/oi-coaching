import { Button, Text, VStack } from "@chakra-ui/react"
import { useState } from "react/cjs/react.development"

const QuestionCard = ({ question, options, answer }) => {

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
            selectedAns === answer ? '2px solid green'
            : (selectedAns !== '' && selectedAns !== answer) ? '2px solid red'
            : ''
        }
    >
        <Text>{question}</Text>

        {
            options && options.length > 0 &&
            options.map((op, idx) => (
                <Button
                    w='full'
                    size={'sm'}
                    key={idx}
                    onClick={() => setAnswer(op)}
                >
                    {op}
                </Button>
            ))
        }
    </VStack>
}

export default QuestionCard