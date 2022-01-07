import { Box, Flex, Icon } from "@chakra-ui/react"
import { BsVolumeDownFill } from "react-icons/bs";
import { useSpeechSynthesis } from 'react-speech-kit';

export const ChatBubbleReceived = ({ text }) => {
    const { speak } = useSpeechSynthesis();
    return <Flex gridGap={1} alignItems={'center'} mb={2}> 
        <Box
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
    <Box mt={1}>
    <Icon 
            alignSelf={'flex-end'} 
            as={BsVolumeDownFill} 
            cursor={'pointer'}
            w={6}
            h={6}
            onClick={() => speak({ text: text })}
            color={'gray'}
           
        />
    </Box>
    
    </Flex>
}

export const ChatBubbleSent = ({ text }) => {
    const { speak } = useSpeechSynthesis();
    return <Flex gridGap={1} alignSelf={'flex-end'} mb={2}>
        <Box mt={1}>
    <Icon 
            alignSelf={'flex-end'} 
            as={BsVolumeDownFill} 
            cursor={'pointer'}
            w={6}
            h={6}
            onClick={() => speak({ text: text })}
            color={'gray'}
            // mt={2}
        />
    </Box>

    <Box
        bg='rgb(78,166,86)'
        bg='linear-gradient( 
            303deg, rgb(32 99 199) 0%, rgb(19 79 155 / 99%) 63%, rgb(32 89 100) 100%)'
        color={'white'}
        p={2}
        fontSize={'12px'}
        boxShadow={'md'}
        borderRadius="25px"
        borderBottomRightRadius="0px"
    >
        {text}
    </Box>
        </Flex>
}
