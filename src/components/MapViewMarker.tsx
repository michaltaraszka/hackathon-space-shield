import { renderToString } from 'react-dom/server';
import {Box} from "@chakra-ui/react";
import L from "leaflet";
import {TbAntenna, TbDrone} from "react-icons/tb";
import {LuTriangleAlert} from "react-icons/lu";
import { Circle, SVGOverlay } from "react-leaflet";

const droneIconHtml = renderToString(
    <Box
        as={TbDrone}
        color="red.500"
        style={{ width: "32px", height: "32px" }}
        bg="white"
        borderRadius="full"
        p="1"
        boxShadow="md"
    />
);

const incidentIconHtml = renderToString(
    <Box
        as={LuTriangleAlert}
        color="red.500"
        style={{ width: "32px", height: "32px" }}
        bg="red"
        borderRadius="full"
        p="1"
        boxShadow="md"
    />
);

const droneStationHtml = renderToString(
    <Box
        as={TbAntenna}
        color="red.500"
        style={{ width: "32px", height: "32px" }}
        bg="white"
        borderRadius="full"
        p="1"
        boxShadow="md"
    />
);

export const IncidentIcon = new L.DivIcon({
    html: incidentIconHtml,
    className: '', // remove default styles
    iconSize: [32, 32],
    iconAnchor: [16, 32], // position the icon's bottom point correctly
});

export const DroneIcon = new L.DivIcon({
    html: droneIconHtml,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

export const DroneStationIcon = new L.DivIcon({
    html: droneStationHtml,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
})

export const DroneStationCircle = ({ center }: { center: [number, number] }) => (
    <Circle
        center={center}
        radius={10000}
        pathOptions={{
            color: "#6ee7b7",
            fillColor: "#6ee7b7",
            fillOpacity: 0.2
        }}
    />
);


export const DroneStationGradientCircle = ({ center, highlight = false }: { center: [number, number], highlight?: boolean }) => {
    const R = 6378137;
    const lat = center[0] * Math.PI / 180;
    const dLat = (10000 / R) * (180 / Math.PI);
    const dLon = (10000 / (R * Math.cos(lat))) * (180 / Math.PI);
    const bounds = [
        [center[0] - dLat, center[1] - dLon],
        [center[0] + dLat, center[1] + dLon]
    ] as L.LatLngBoundsExpression;
    return (
        <SVGOverlay bounds={bounds} zIndex={highlight ? 300 : 200}>
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                <defs>
                    <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.7" />
                        <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.05" />
                    </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="50" fill="url(#grad)" stroke={highlight ? "#fff" : "#000"} strokeWidth={highlight ? 1.5 : 0.05} />
            </svg>
        </SVGOverlay>
    );
};