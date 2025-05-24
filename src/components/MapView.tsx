import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import {useStore} from "../store.ts";
import L from "leaflet";
import {Popover} from "@chakra-ui/react";
import {DroneStationIcon, DroneStationGradientCircle, IncidentIcon} from "./MapViewMarker.tsx";
import {useEffect} from "react";
import {RightClickHandler} from "./RightClickHandler.tsx";
import {IncidentReportPopover} from "./IncidentReportPopover.tsx";

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
    const droneStations = useStore((state) => state.stations);
    const incidents = useStore((state) => state.incidents);
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
        <ScaleControl />
        <RightClickHandler/>
        <IncidentReportPopover/>
        {droneStations.map(station => (
            <>
                <DroneStationGradientCircle center={[station.position.latitude, station.position.longitude]} />
                <Marker
                    position={[station.position.latitude, station.position.longitude]}
                    icon={DroneStationIcon}
                >
                    <Popover>Custom styled marker</Popover>
                </Marker>
            </>
        ))}
        {incidents.map(incident => (
            <Marker
                position={[incident.data.location!.latitude, incident.data.location!.longitude]}
                icon={IncidentIcon}
            />
        ))}
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
        />
    </MapContainer>);
}