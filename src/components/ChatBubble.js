import { Box } from "@chakra-ui/react"

export const ChatBubbleReceived = ({ text }) => {
    return <Box
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

export const ChatBubbleSent = ({ text }) => {
    return <Box
        bg='rgb(78,166,86)'
        bg='linear-gradient( 
            303deg, rgb(32 99 199) 0%, rgb(19 79 155 / 99%) 63%, rgb(32 89 100) 100%)'
        color={'white'}
        p={2}
        fontSize={'12px'}
        boxShadow={'md'}
        borderRadius="25px"
        borderBottomRightRadius="0px"
        alignSelf='flex-end'
    >
        {text}
    </Box>
}
