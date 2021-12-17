import { Button, Text, VStack } from "@chakra-ui/react"

const QuestionCard = ({ question }) => {

    return <VStack
        p={2}
        boxShadow={'md'}
        borderRadius={'lg'}
        spacing={2}
        w='full'
    >
        <Text>{question}</Text>

        <Button
            w='full'
            size={'sm'}
        >
            Option 1
        </Button>
        <Button
            w='full'
            size={'sm'}
        >
            Option 1
        </Button>
        <Button
            w='full'
            size={'sm'}
        >
            Option 1
        </Button>
    </VStack>
}

export default QuestionCard