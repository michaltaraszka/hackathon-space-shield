import { Box, VStack, Heading, Text } from "@chakra-ui/react";

export const Sidebar: React.FC = () => (
  <Box w="300px" bg="gray.800" color="white" p={4} h="100vh">
    <VStack align="start" spacing={4}>
      <Heading size="md">Map Sidebar</Heading>
      <Text>Some content here</Text>
      <Text>More controls</Text>
    </VStack>
  </Box>
);

export default Sidebar; 