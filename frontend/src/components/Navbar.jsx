import { Container, Flex, HStack, Text, Button, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { PlusSquareIcon } from '@chakra-ui/icons'

import { IoMoon } from "react-icons/io5";
import {LuSun } from "react-icons/lu";



const Navbar = () => {

  const { colorMode, toggleColorMode } = useColorMode(); 




  
  return (
    <Container maxW={"1140px"} px={4} >
      <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={{
            base: "column",
            sm: "row",
        }}
      >

      <Text
        bgGradient={useColorModeValue("linear(to-l, #7928CA, #FF0080)", undefined)}
        bgClip='text'
        fontSize={{base: '3xl', md: '4xl'}}
        fontWeight='extrabold'
        color={useColorModeValue("transparent", "white")}
      >
        <Link to={"/"}>Product Store 🛒 </Link>
      </Text>

      <HStack
        spacing={2}
        alignItems={"center"}>
        
        <Link to={"/create"}>
        <Button> <PlusSquareIcon fontSize={25} />  </Button>
        </Link>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <IoMoon/>: <LuSun size="20"/>}
        </Button>
      </HStack>

      </Flex>

    </Container>
  );
};

export default Navbar