import { Button, Flex, Icon, Image, Select } from "@chakra-ui/react"
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"

const BottomAction = ({
    increaseFontSize, 
    decreaseFontSize , 
    handleColorChange, 
    reset,
    setIsReport,
    background,
    handleBackground
}) => {
    return  <Flex alignItems={'center'} gridGap={3}>
        <Button
            size={'xs'}
            bgColor={'#4dd4b9'}
            color={'black'}
            boxShadow={'lg'}
            ml={2}
            onClick={() => setIsReport(true)}
        >
            Show Report
        </Button>

        <Image 
            src={background === 'dark' ? '/font_plus_white.svg' : '/font_plus.svg'}
            cursor={'pointer'}
            onClick={increaseFontSize}
        />
        <Image 
            src={background === 'dark' ? '/font_minus_white.svg' : '/font_minus.svg'}
            cursor={'pointer'}
            onClick={decreaseFontSize}
        />

        <Select size={'xs'} w='35' onChange={handleColorChange} color={background === 'dark' ? 'white' : 'black'}>
            {/* { 
                background !== 'light_one' &&  <option value={'light'}>Light 1</option>
            } */}
            <option value={'light'}>Light 1</option>
            <option value={'light_two'}>Light 2</option>
            {
                background !== 'dark' && <option value={'dark'}>Dark</option>
            }
            <option value={'pink'}>Pink</option>
            <option value={'yellow'}>Yellow</option>
        </Select>
        {
            background === 'light_one' ? <Icon 
                as={BsFillMoonFill} 
                onClick={() => handleBackground('dark')}
            />
            : <Icon 
                as={BsFillSunFill} 
                onClick={() => handleBackground('light_one')}
                color='white'
            />
        }
        
        <Button
            size={'xs'}
            bgColor={'red'}
            color={'white'}
            boxShadow={'lg'}
            ml={2}
            onClick={reset}
        >
            Reset
        </Button>
    </Flex>
}

export default BottomAction