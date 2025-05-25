import { Box, VStack, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Badge, Flex, Progress } from "@chakra-ui/react";
import { useStore } from "../store";

export const Sidebar: React.FC = () => {
  const stations = useStore(state => state.stations);
  const selectedStation = useStore(state => state.view.selectedStationId);
  const setSelectedStation = useStore(state => state.view.setSelectedStationId);
  return (
    <Box w="300px" bg="gray.800" color="white" p={4} h="100vh">
      <VStack align="start" spacing={4}>
        <Heading size="md">Rescue Eye</Heading>
        <Accordion allowToggle w="100%">
          <AccordionItem border="none">
            <AccordionButton>
              <Heading size="sm" flex="1" textAlign="left">Docking stations</Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={2}>
              <Accordion allowToggle w="100%" defaultIndex={stations.findIndex(s => s.id === selectedStation)}>
                {stations.length === 0 ? (
                  <AccordionItem border="none">
                    <AccordionButton>
                      <Text fontSize="sm" color="gray.400">No docking stations</Text>
                    </AccordionButton>
                  </AccordionItem>
                ) : (
                  stations.map(station => (
                    <AccordionItem key={station.id} border="none">
                      <AccordionButton
                        bg={selectedStation === station.id ? "gray.700" : "transparent"}
                        color={selectedStation === station.id ? "blue.300" : "gray.200"}
                        fontWeight={selectedStation === station.id ? "bold" : "normal"}
                        borderRadius="md"
                        px={2}
                        py={1}
                        _hover={{ bg: "gray.700", color: "blue.200" }}
                        onClick={() => setSelectedStation(station.id)}
                      >
                        <Flex flex="1" textAlign="left" align="center">
                          {station.id}
                          <Badge ml={2} colorScheme="green">Online</Badge>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={2} bg="gray.900" borderRadius="md" mt={1}>
                        <Text fontSize="xs" color="gray.400" mb={1}><b>Localization:</b> {station.position.latitude.toFixed(5)}, {station.position.longitude.toFixed(5)}</Text>
                        <Text fontSize="xs" color="gray.400" mb={1}><b>Description:</b> Docking station</Text>
                        {station.drones && station.drones.length > 0 ? (
                          station.drones.map((drone: any, idx: number) => (
                            <Box key={drone.name || idx} mb={2} p={2} bg="gray.800" borderRadius="md">
                              <Text fontSize="xs" color="gray.300"><b>Drone:</b> {drone.name || `Dron #${idx+1}`}</Text>
                              <Text fontSize="xs" color="gray.300"><b>Charge:</b></Text>
                              <Progress value={drone.battery || 100} size="xs" colorScheme={drone.battery > 50 ? "green" : drone.battery > 20 ? "yellow" : "red"} mb={1}/>
                              <Text fontSize="xs" color="gray.300"><b>State:</b> {drone.status || "available"}</Text>
                            </Box>
                          ))
                        ) : (
                          <Box mb={2} p={2} bg="gray.800" borderRadius="md">
                            <Text fontSize="xs" color="gray.300"><b>Drone:</b> Brak danych</Text>
                            <Text fontSize="xs" color="gray.300"><b>Charge:</b> -</Text>
                            <Text fontSize="xs" color="gray.300"><b>State:</b> -</Text>
                          </Box>
                        )}
                        <Text fontSize="xs" color="gray.400" mt={2}><b>Last update:</b> 2 minutes ago</Text>
                      </AccordionPanel>
                    </AccordionItem>
                  ))
                )}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default Sidebar; 