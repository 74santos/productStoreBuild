import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, VStack, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react'
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';


const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("Products", products);

  return (
   <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text 
        fontSize={"30"}
        fontWeight={"bold"}
        fontStyle={"italic"}
        bgGradient={useColorModeValue("linear(to-l, #7928CA, #FF0080)", undefined)}
        bgClip='text'
        color={useColorModeValue("transparent", "white")}
        textAlign={"center"} 
        >
          Current Products  🚀
        </Text>

        <SimpleGrid
        columns={{base: 1, md: 2, lg: 3}}
        spacing={12}
        w={"full"}>

        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}


        </SimpleGrid>

     {products.length === 0 && (
         <Text 
         fontSize='xl' textAlign={"center"} fontWeight={"bold"} color='gray.500'>
            No products found 😟{" "}
            <Link to={"/create"}>
             <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}>
               Create a product
             </Text>
            </Link>
         </Text>
      )}



        </VStack>
   </Container>
  )
}

export default HomePage