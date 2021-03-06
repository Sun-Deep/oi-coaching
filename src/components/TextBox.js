import { Flex, FormControl, Icon, Input, Spinner } from "@chakra-ui/react"
import { MdSend } from 'react-icons/md'

const TextBox = ({ handleInputText, getQuestion, isLoading, inputText, background }) => {

    return <Flex p={2} alignItems={'center'} gridGap={3}>
        <FormControl isRequired>
            <form onSubmit={getQuestion}>
                <Input 
                    borderRadius={'lg'}
                    border={'1px solid'}
                    borderColor={'#00B589'}
                    onChange={handleInputText}
                    value={inputText}
                    color={background === 'dark' ? 'white' : 'black'}
                />
            </form>

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