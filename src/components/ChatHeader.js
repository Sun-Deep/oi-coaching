import { Box, Flex, Heading, Image, Select, Text } from "@chakra-ui/react"

const ChatHeader = () => {

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
    </Box>
}

export default ChatHeader