import { Heading, VStack, Box, Container, useColorModeValue, Input, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';


const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

  const {createProduct} = useProductStore()

  const bgColor = useColorModeValue("white", "gray.800");

  const handleAddProduct = async() => {
   const {success, message} = await createProduct(newProduct);
   if(!success) return toast({
     title: "Error",
     description: message,
     status: "error",
     isClosable: true,
   });
   toast({
     title: "Success",
     description: message,
     status: "success",
     isClosable: true,
   });

   setNewProduct({ name: "", price: "", image: ""}); // reset the form
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a new product
        </Heading>

        <Box
          w={"full"}
          bg={bgColor}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Product image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              {" "}
              Add product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage