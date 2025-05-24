import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";

interface SidebarRightProps {
  event?: {
    id: string;
    type: string;
    lat: number;
    lng: number;
  } | null;
  onCancel?: () => void;
}

export const SidebarRight: React.FC<SidebarRightProps> = ({ event, onCancel }) => (
  <Box w="300px" bg="gray.800" color="white" p={4} h="100vh">
    <VStack align="start" spacing={4}>
      {event ? (
        <Box bg="white" color="gray.800" borderRadius="md" p={3} boxShadow="md" w="100%">
          <Heading size="sm" mb={2}>Nowe zgłoszenie</Heading>
          <Text fontSize="xs" mb={1}><b>ID:</b> {event.id}</Text>
          <Text fontSize="xs" mb={1}><b>Typ:</b> {event.type}</Text>
          <Text fontSize="xs" mb={2}><b>Lokalizacja:</b> {event.lat.toFixed(5)}, {event.lng.toFixed(5)}</Text>
          <Button colorScheme="blue" size="sm" mr={2}>Wyślij Drona</Button>
          <Button colorScheme="red" size="sm" variant="outline" onClick={onCancel}>Anuluj</Button>
        </Box>
      ) : (
        <>
          <Heading size="md">Panel boczny (prawy)</Heading>
          <Text>Tu możesz dodać własne opcje</Text>
          <Text>Więcej funkcji</Text>
        </>
      )}
    </VStack>
  </Box>
);

export default SidebarRight; 