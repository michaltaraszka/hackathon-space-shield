// src/HomePage.tsx
import { Box, Flex } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import {MapViewComponent} from "./MapView.tsx";
import Sidebar from "./Sidebar";
import SidebarRight from "./SidebarRight";

export const HomePage: React.FC = () => {
    return (
        <Flex h="100vh" w="100vw" overflow="hidden">
            <Sidebar />
            <Box flex="1" h="100%">
                <MapViewComponent />
            </Box>
            <SidebarRight />
        </Flex>
    );
};
