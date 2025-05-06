import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Image, Heading, Text, HStack, VStack, Input, Button, IconButton , useColorModeValue, useDisclosure, useToast,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useProductStore } from '../store/product'

const ProductCard = ({product}) => {

   const [updatedProduct, setUpdatedProduct] = useState(product);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.600", "white");
  const bg = useColorModeValue("white", "gray.800");

 const {deleteProduct ,updateProduct} = useProductStore();
 const toast = useToast();

const handleDeleteProduct = async (pid) => {
   const {success, message} = await deleteProduct(pid);
    if(!success) return toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
};


const handleUpdateProduct = async (pid,updatedProduct) => {
  const {success, message} = await updateProduct(pid,updatedProduct);
  onClose();
  if(!success) return toast({
    title: "Error",
    description: message,
    status: "error",
    duration: 3000,
    isClosable: true, 
  });
  toast({
    title: "Success",
    description: message,
    status: "success",
    duration: 3000,
    isClosable: true,
    
  })
}

  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow={'hidden'}
    transition='all 0.3s'
    _hover={{transform: 'translateY(-5px)', shadow: 'xl'}} 
    bg={bg}   
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit={'cover'} />

      <Box p={4}>
        <Heading
           as='h3'
          size='md'
         mb={2}
          lineHeight='tight'
          isTruncated
        >
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          Price: ${product.price}
        </Text>

        <HStack spacing={2}>
         <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />

         <IconButton icon={<DeleteIcon />} onClick={ () => handleDeleteProduct(product._id)} colorScheme='red' />
        </HStack>


      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
                        <Input
                          placeholder="Product Name"
                          name="name"
                          value={updatedProduct.name}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                        <Input
                          placeholder="Price"
                          name="price"
                          type="number"
                          value={updatedProduct.price}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                         
                        />
                        <Input
                          placeholder="Product image URL"
                          name="image"
                          value={updatedProduct.image}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        />
                      </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
             Update
            </Button>
            <Button variant='ghost' onClick={onClose} >Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  )
}

export default ProductCard