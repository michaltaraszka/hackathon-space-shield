// src/HomePage.tsx
import { Box, Flex, VStack, Heading, Text } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import {MapViewComponent} from "./MapView.tsx";

 export const HomePage: React.FC = () => {
    return (
        <Flex h="100vh" w="100vw" overflow="hidden">
            {/* Sidebar */}
            <Box w="300px" bg="gray.800" color="white" p={4}>
                <VStack align="start">
                    <Heading size="md">Map Sidebar</Heading>
                    <Text>Some content here</Text>
                    <Text>More controls</Text>
                </VStack>
            </Box>

            {/* Map */}
            <Box flex="1" h="100%">
                <MapViewComponent/>
            </Box>
        </Flex>
    );
};
