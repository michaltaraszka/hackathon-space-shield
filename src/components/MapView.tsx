import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import {useStore} from "../store.ts";
import L from "leaflet";
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
    const missions = useStore((state) => state.missions);
    const drones = droneStations.flatMap(station => station.drones);
    const dronesWithMissions = drones.filter(drone => missions.some(mission => mission.droneId === drone.id))
    // filter out drones that finish their missions
    .filter(drone => !missions.some(mission => mission.droneId === drone.id && (mission.status === 'COMPLETED' || mission.status === 'CANCELED' || mission.status === 'FAILED')));
    const selectedStation = useStore((state) => state.view.selectedStationId);

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
                {incidents.map(incident => (
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
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
            </MapContainer>
            <IncidentReportPopup></IncidentReportPopup>
        </Box>
    );
}