import React from 'react';
import ReactDOM from 'react-dom';
import { Box, ChakraProvider, Image, Text } from '@chakra-ui/react'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
    <Box display={['none', 'none', 'none', 'block']} w='250px' pos={'absolute'} top={0} left={10}>
        <Image objectFit={'contain'} src="/logo.png" />
      </Box>
      <App />
      <Text
        color={'gray'}
        fontSize="10px"
        textAlign={'right'}
      >
        Confindential. Do Not Share. All IP belongs to Otermans Institute 2021.
      </Text>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
