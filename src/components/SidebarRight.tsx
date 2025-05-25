import {
    Box,
    VStack,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text, Badge,
} from "@chakra-ui/react";
import { useStore } from "../store.ts";
import { IncidentView } from "./IncidentView.tsx";

export const SidebarRight: React.FC = () => {
    const incidents = useStore((state) => state.incidents);

    return (
        <Box w="300px" bg="gray.800" color="white" p={4} h="100vh" overflowY="auto">
            <VStack align="start" spacing={4} w="100%">
                <Heading size="md">Incidents</Heading>
                <Accordion allowToggle w="100%">
                    {incidents.length === 0 ? (
                        <AccordionItem border="none">
                            <AccordionButton>
                                <Text fontSize="sm" color="gray.400">No incidents</Text>
                            </AccordionButton>
                        </AccordionItem>
                    ) : (
                        incidents.map((incident) => (
                            <AccordionItem key={incident.id} border="none">
                                <AccordionButton
                                    _hover={{ bg: "gray.700", color: "blue.200" }}
                                    px={2}
                                    py={1}
                                    borderRadius="md"
                                >
                                    <Text flex="1" textAlign="left" fontSize="sm">
                                        Incident
                                        <Badge ml={2} colorScheme="green">{incident.status}</Badge>
                                    </Text>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2} bg="gray.900" borderRadius="md" mt={1}>
                                    <IncidentView incidentId={incident.id} />
                                </AccordionPanel>
                            </AccordionItem>
                        ))
                    )}
                </Accordion>
            </VStack>
        </Box>
    );
};

export default SidebarRight;
