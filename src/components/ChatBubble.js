import { Box } from "@chakra-ui/react"

const ChatBubble = ({text}) => {
    return <Box
        bgColor={'#b6c7c3'}
        p={2}
        fontSize={'12px'}
        boxShadow={'md'}
        borderRadius="25px"
        borderBottomLeftRadius="0px"
    >
        {text}
    </Box>
}

export default ChatBubble