import {MapContainer, Marker, Polyline, TileLayer, useMap} from "react-leaflet";
import {useStore} from "../store.ts";
import L, {latLng} from "leaflet";
import {Popover, Box} from "@chakra-ui/react";
import React from "react";
import {DroneStationIcon, DroneStationGradientCircle, IncidentIcon, DroneIcon} from "./MapViewMarker.tsx";
import {useEffect} from "react";
import {IncidentReportPopup} from "./IncidentReportPopup.tsx";
import {RightClickHandler} from "./RightClickHandler.tsx";

function ScaleControl() {
    const map = useMap();
    useEffect(() => {
        const scale = L.control.scale({ position: 'bottomleft', imperial: false });
        scale.addTo(map);
        return () => {
            scale.remove();
        };
    }, [map]);
    return null;
}

export const MapViewComponent: React.FC = () => {
    const centerLocation = useStore((state) => state.view.map.center);
    const droneStations = useStore((state) => state.stations)
    const incidents = useStore((state) => state.incidents);
    const drones = droneStations.flatMap(station => station.drones);
    const dronesWithMissions = drones.filter(drone => drone.status == 'ON_MISSION');
    const selectedStation = useStore((state) => state.view.selectedStationId);

    // get missions from the store
    const missions = useStore((state) => state.missions);
    const activeMissions = missions.filter(mission => mission.status !== 'COMPLETED' && mission.status !== 'CANCELED' && mission.status !== 'FAILED');

    //get data to create polylines for active missions

    const activeMissionPolylines = activeMissions.map(mission => {
        const droneStationLocation = droneStations.find(station => station.id === mission.baseStationId)?.position;
        const incidentLocation = incidents.find(incident => incident.id === mission.incidentId)?.data.location;
        if (!droneStationLocation || !incidentLocation) return null;
        return [
                latLng(droneStationLocation.latitude, droneStationLocation.longitude),
                latLng(incidentLocation.latitude, incidentLocation.longitude),
            ]
    });

    // Fix leaflet's default icon issue in many bundlers:
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: import('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: import('leaflet/dist/images/marker-icon.png'),
        shadowUrl: import('leaflet/dist/images/marker-shadow.png'),
    });

    return (
        <Box position="relative" w="100%" h="100%">
            <MapContainer
                center={[centerLocation.latitude, centerLocation.longitude]}
                zoom={13}
                style={{height: "100%", width: "100%"}}
            >
                <RightClickHandler/>
                <ScaleControl />

                {droneStations.map(station => (
                    <React.Fragment key={station.id}>
                        <DroneStationGradientCircle
                            center={[station.position.latitude, station.position.longitude]}
                            highlight={selectedStation === station.id}
                        />
                        <Marker
                            position={[station.position.latitude, station.position.longitude]}
                            icon={DroneStationIcon}
                            //className={selectedStation === station.id ? 'highlighted-marker' : ''}
                        >
                            <Popover>Custom styled marker</Popover>
                        </Marker>
                    </React.Fragment>
                ))}
                {incidents
                    // filter out incidents that are closed
                    .filter(incident => incident.status !== 'CLOSED')
                    .map(incident => (
                    <Marker
                        position={[incident.data.location!.latitude, incident.data.location!.longitude]}
                        icon={IncidentIcon}
                    />
                ))}
                {dronesWithMissions.map(drone => (
                    <Marker
                        key={drone.id}
                        position={[drone.position.latitude, drone.position.longitude]}
                        icon={DroneIcon}
                    />
                ))}
                // Render polylines for active missions
                {activeMissionPolylines.map((polyline, index) => {
                    return (
                        <Polyline
                            key={index}
                            positions={polyline!}
                            color="blue"
                            weight={3}
                            opacity={0.7}
                        />
                    );
                })}

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
            </MapContainer>
            <IncidentReportPopup></IncidentReportPopup>
        </Box>
    );
}