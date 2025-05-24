// src/HomePage.tsx
import { Box, Flex } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import {MapViewComponent} from "./MapView.tsx";
import Sidebar from "./Sidebar";
import SidebarRight from "./SidebarRight";
import { useState } from "react";

export const HomePage: React.FC = () => {
    const [event, setEvent] = useState<any>(null);
    const [selectedStation, setSelectedStation] = useState<string | null>(null);
    return (
        <Flex h="100vh" w="100vw" overflow="hidden">
            <Sidebar selectedStation={selectedStation} onSelectStation={setSelectedStation} />
            <Box flex="1" h="100%">
                <MapViewComponent onCreateEvent={setEvent} selectedStation={selectedStation} />
            </Box>
            <SidebarRight event={event} onCancel={() => setEvent(null)} />
        </Flex>
    );
};
