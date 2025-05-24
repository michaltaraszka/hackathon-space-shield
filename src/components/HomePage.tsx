// src/HomePage.tsx
import { Box, Flex } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import {MapViewComponent} from "./MapView.tsx";
import Sidebar from "./Sidebar";
import SidebarRight from "./SidebarRight";
import { useState } from "react";

export const HomePage: React.FC = () => {
    const [event, setEvent] = useState<any>(null);
    return (
        <Flex h="100vh" w="100vw" overflow="hidden">
            <Sidebar />
            <Box flex="1" h="100%">
                <MapViewComponent onCreateEvent={setEvent} />
            </Box>
            <SidebarRight event={event} onCancel={() => setEvent(null)} />
        </Flex>
    );
};
