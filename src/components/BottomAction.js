import { Button, Flex, Image, Select } from "@chakra-ui/react"

const BottomAction = ({
    increaseFontSize, 
    decreaseFontSize , 
    handleColorChange, 
    reset,
    setIsReport 
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
            src="/font_plus.svg" 
            cursor={'pointer'}
            onClick={increaseFontSize}
        />
        <Image 
            src="/font_minus.svg" 
            cursor={'pointer'}
            onClick={decreaseFontSize}
        />

        <Select size={'xs'} w='35' onChange={handleColorChange}>
            <option value={'light'}>Light 1</option>
            <option value={'light_two'}>Light 2</option>
            <option value={'dark'}>Dark</option>
            <option value={'pink'}>Pink</option>
            <option value={'yellow'}>Yellow</option>
        </Select>

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