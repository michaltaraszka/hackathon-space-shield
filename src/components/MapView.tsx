import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {useStore} from "../store.ts";
import L from "leaflet";
import {Popover} from "@chakra-ui/react";
import {DroneStationIcon} from "./MapViewMarker.tsx";

export const MapViewComponent: React.FC = () => {
    const centerLocation = useStore((state) => state.map.center);
    const droneStations = useStore((state) => state.stations)
    // Fix leaflet's default icon issue in many bundlers:
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: import('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: import('leaflet/dist/images/marker-icon.png'),
        shadowUrl: import('leaflet/dist/images/marker-shadow.png'),
    });
    return (<MapContainer
        center={[centerLocation.latitude, centerLocation.longitude]}
        zoom={13}
        style={{height: "100%", width: "100%"}}
    >
        {droneStations.map(station => (
            <Marker
                position={[station.position.latitude, station.position.longitude]}
                icon={DroneStationIcon}
            >
                <Popover>Custom styled marker</Popover>
            </Marker>
        ))}
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
        />
    </MapContainer>);
}