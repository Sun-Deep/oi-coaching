import { Box } from "@chakra-ui/react"

const ChatBubble = ({text}) => {
    return <Box
        // bg={'radial-gradient(circle, #1c816c 0%, #3aad96 95%)'}
        bg='rgb(78,166,86)'
        bg='linear-gradient(
            90deg, rgba(78,166,86,1) 0%, rgb(62 161 141 / 99%) 63%, rgb(5 121 145) 100%)'
        color={'white'}
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