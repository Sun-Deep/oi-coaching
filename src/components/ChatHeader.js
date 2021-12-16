import { Box, Flex, Image, Text } from "@chakra-ui/react"

const ChatHeader = () => {

    return <Box
        bgColor='#AED2D0'
        w='full'
        p={2}
    >
        <Flex>
            <Box>
                <Text fontSize='12px'>Hi, I am OTTO</Text>
                <Text fontSize='10px'>I can ask you questions, help your revise and test your knowledge.</Text>
                <Text />
                <Text fontSize='12px'>
                    You can start by putting link in the text box.
                </Text>
            </Box>
            <Box
                w='100px'
            >
                <Image objectFit='contain' src="/bot.svg" alt="bot image" />
            </Box>
        </Flex>
    </Box>
}

export default ChatHeader