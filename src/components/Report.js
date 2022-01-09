import { Box, Flex, Icon } from "@chakra-ui/react"
import { ResponsiveBar } from "@nivo/bar"
import { HiArrowLeft } from 'react-icons/hi'
import bar from "../mockup/bar";

const Report = ({ setIsReport }) => {
    return <Box w='100%'>
    <Icon m={2} w={10} h={10} as={HiArrowLeft} color={'#4dd4b9'} onClick={() => setIsReport(false)} />
    <Flex
       mt={10}
       mb={10}
       w='550px'
       p={2}
       justifyContent={'center'}
     >
   <Box w='100%' h='500px'>
     <ResponsiveBar
       data={bar}
       keys={[ 'time' ]}
       indexBy="question"
       margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
       padding={0.3}
       valueScale={{ type: 'linear' }}
       indexScale={{ type: 'band', round: true }}
       colors={{ scheme: 'nivo' }}
       defs={[
           {
               id: 'lines',
               type: 'patternLines',
               background: 'inherit',
               color: '#eed312',
               rotation: -45,
               lineWidth: 6,
               spacing: 10
           }
       ]}
       fill={[
           {
               match: {
                   id: 'time'
               },
               id: 'lines'
           }
       ]}
       borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
       axisTop={null}
       axisRight={null}
       axisBottom={{
           tickSize: 5,
           tickPadding: 5,
           tickRotation: 0,
           legend: 'Questions',
           legendPosition: 'middle',
           legendOffset: 32
       }}
       axisLeft={{
           tickSize: 5,
           tickPadding: 5,
           tickRotation: 0,
           legend: 'Time Spent',
           legendPosition: 'middle',
           legendOffset: -40
       }}
       labelSkipWidth={12}
       labelSkipHeight={12}
       labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
       role="application"
       ariaLabel="Nivo bar chart demo"
       barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
     />
   </Box>
 </Flex>
 </Box>
}

export default Report