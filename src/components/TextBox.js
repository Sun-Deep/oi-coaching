import { Flex, FormControl, Icon, Input, Spinner } from "@chakra-ui/react"
import { MdSend } from 'react-icons/md'

const TextBox = ({ handleInputText, getQuestion, isLoading, inputText }) => {

    return <Flex p={2} alignItems={'center'} gridGap={3}>
        <FormControl isRequired>
            <Input 
                borderRadius={'lg'}
                border={'1px solid'}
                borderColor={'#00B589'}
                onChange={handleInputText}
                value={inputText}
            />
        </FormControl>
        {
            isLoading ? <Spinner color='#00B589' /> : <Icon 
            w={8} 
            h={8} 
            as={MdSend} 
            color={'#00B589'} 
            cursor={'pointer'}
            onClick={getQuestion}
        />
        }
        
    </Flex>
}

export default TextBox