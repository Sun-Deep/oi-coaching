import { Box, Flex, Heading, Image, Select, Text } from "@chakra-ui/react"

const ChatHeader = ({handleQuestionType, questionType }) => {

    return <Box
        bg= '#1CD8D2'
        bg='-webkit-linear-gradient(to right, #93EDC7, #1CD8D2)'
        bg='linear-gradient(to right, #93EDC7, #1CD8D2)'
        w='full'
        p={2}
        borderRadius={'lg'}
    >
        <Flex justifyContent={'space-between'}>
            <Box>
                <Heading>OTTO</Heading>
            </Box>
            <Box>
                <Image w='60px' objectFit='contain' src="/bot.svg" alt="bot image" />
            </Box>
        </Flex>

        {/* <Box mt={2}>
            <Select
                placeholder="Select Question Type"
                border={'2px solid'}
                onChange={handleQuestionType}
                value={questionType}
            >
                <option value={'boolean'}>Boolean (True or False)</option>
                <option value={'mcq'}>MCQ</option>
                <option value={'short_question'}>Short Question</option>
            </Select>
        </Box> */}
    </Box>
}

export default ChatHeader