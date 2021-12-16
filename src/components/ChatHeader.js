import { Box, Flex, Image, Select, Text } from "@chakra-ui/react"

const ChatHeader = () => {

    return <Box
        bgColor='#AED2D0'
        w='full'
        p={2}
        borderRadius={'lg'}
    >
        <Flex justifyContent={'space-between'}>
            <Box>
                <Text fontSize='14px'>Hi, I am OTTO</Text>
                <Text fontSize='12px'>I can ask you questions, help your revise and test your knowledge.</Text>
                <Text fontSize='15px' mt={2}>
                    You can start by putting link in the text box.
                </Text>
            </Box>
            <Box>
                <Image objectFit='contain' src="/bot.svg" alt="bot image" />
            </Box>
        </Flex>

        <Box mt={2}>
            <Select
                placeholder="Select Question Type"
                border={'2px solid'}
            >
                <option value={'boolean'}>Boolean</option>
                <option value={'mcq'}>MCQ</option>
                <option value={'short_question'}>Short Question</option>
            </Select>
        </Box>
    </Box>
}

export default ChatHeader