import {Box, VStack} from "@chakra-ui/react";
import {useStore} from "../store.ts";
import {IncidentView} from "./IncidentView.tsx";

export const SidebarRight: React.FC = () => {
    const incidents = useStore((state) => state.incidents);

    return (
        <Box w="300px" bg="gray.800" color="white" p={4} h="100vh">
            <VStack align="start" spacing={4}>
                {incidents.map((incident) => <IncidentView incidentId={incident.id} />)}
            </VStack>
        </Box>
    )
};

export default SidebarRight; 