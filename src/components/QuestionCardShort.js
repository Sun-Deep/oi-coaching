import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import { useRef } from "react"
import { useState } from "react/cjs/react.development"

const QuestionCardShort = ({ question, options, answer }) => {

    const [selectedAns, setSelectedAns] = useState('')

    const ansRef = useRef()

    const setAnswer = () => {
        setSelectedAns(ansRef.current.value)
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