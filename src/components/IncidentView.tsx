import { Box, Button, Text } from "@chakra-ui/react";
import { useStore } from "../store.ts";
import type { Incident } from "../models/Incident.ts";
import { selectDroneStation } from "../services.ts";
import { mockDroneMission } from "../mockServices.ts";
import type { Location } from "../models/Location.ts";
import {PhotoGalleryPopover} from "./PhotoGalleryPopover.tsx";

export interface IncidentViewProps {
    incidentId: string;
}

export const IncidentView: React.FC<IncidentViewProps> = ({ incidentId }) => {
    const incident = useStore((state) => state.incidents.find(i => i.id === incidentId))!;
    const activeMission = useStore((state) => state.missions.find(m => m.incidentId === incidentId));
    const stations = useStore((state) => state.stations);
    const createMission = useStore((state) => state.createMission);
    const updateDronePosition = useStore((state) => state.updateDronePosition);
    const updateMissionStatus = useStore((state) => state.updateMissionStatus);
    const uploadMissionPhotos = useStore((state) => state.uploadMissionPhotos);
    const resetDroneAfterMission = useStore((state) => state.resetDroneAfterMission);

    const sendDrone = (location: Location, incident: Incident) => {
        const nearestDrone = selectDroneStation(location, stations);
        if (nearestDrone) {
            const missionId = `mission_${Math.random().toString(36).substr(2, 9)}`;
            createMission(missionId, nearestDrone.droneId, nearestDrone.id, incident.id);
            const droneStation = stations.find(station => station.id === nearestDrone.id)!;
            const drone = droneStation.drones.find(d => d.id === nearestDrone.droneId)!;
            mockDroneMission(
                missionId,
                droneStation,
                drone,
                incident,
                updateDronePosition,
                updateMissionStatus,
                uploadMissionPhotos,
                resetDroneAfterMission,
                10
            );
        } else {
            console.error("No available drones found.");
        }
    };

    return (
        <Box bg="gray.800" color="gray.200" borderRadius="md" p={3} fontSize="xs">
            <Text mb={1}><b>ID:</b> {incident.id}</Text>
            <Text mb={1}><b>Type:</b> {incident.data.incidentType}</Text>
            <Text mb={2}><b>Localization:</b> {incident.data.location.latitude.toFixed(5)}, {incident.data.location.longitude.toFixed(5)}</Text>
            {activeMission ? (
                <>
                    <Text mb={1}><b>Mission ID:</b> {activeMission.missionId}</Text>
                    <Text mb={1}><b>Status:</b> {activeMission.status}</Text>
                    <Text mb={1}><b>Start:</b> {activeMission.startTime.toLocaleString()}</Text>
                    {activeMission.endTime && (
                        <Text mb={1}><b>End:</b> {activeMission.endTime.toLocaleString()}</Text>
                    )}
                    <PhotoGalleryPopover photos={activeMission?.photos || []} />
                </>
            ) : (
                <>
                    <Button colorScheme="blue" size="sm" mr={2} onClick={() => sendDrone(incident.data.location, incident)}>Send drone</Button>
                    <Button colorScheme="red" size="sm" variant="outline" onClick={() => {}}>Cancel</Button>
                </>
            )}
        </Box>
    );
};
