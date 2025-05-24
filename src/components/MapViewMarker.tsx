import { renderToString } from 'react-dom/server';
import {Box} from "@chakra-ui/react";
import L from "leaflet";
import {TbAntenna, TbDrone} from "react-icons/tb";

const droneIconHtml = renderToString(
    <Box
        as={TbDrone}
        color="red.500"
        boxSizing="content-box"
        bg="white"
        borderRadius="full"
        p="1"
        boxShadow="md"
    />
);

const droneStationHtml = renderToString(
    <Box
        as={TbAntenna}
        boxSizing="content-box"
        color="red.500"
        boxSize="32px"
        bg="white"
        borderRadius="full"
        p="1"
        boxShadow="md"
    />
);

export const DroneIcon = new L.DivIcon({
    html: droneIconHtml,
    className: '', // remove default styles
    iconSize: [32, 32],
    iconAnchor: [16, 32], // position the icon's bottom point correctly
});

export const DroneStationIcon = new L.DivIcon({
    html: droneStationHtml,
    className: '', // remove default styles
    iconSize: [32, 32],
    iconAnchor: [16, 32], // position the icon's bottom point correctly
})