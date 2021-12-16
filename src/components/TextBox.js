import { Flex, Icon, Input } from "@chakra-ui/react"
import { MdSend } from 'react-icons/md'

const TextBox = () => {

    return <Flex p={2} alignItems={'center'} gridGap={3}>
        <Input 
            borderRadius={'lg'}
            border={'1px solid'}
            borderColor={'#00B589'}
        />

        <Icon w={8} h={8} as={MdSend} color={'#00B589'} />
    </Flex>
}

export default TextBox