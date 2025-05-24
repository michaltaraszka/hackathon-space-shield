import {MapContainer, Marker, TileLayer, useMap, useMapEvent} from "react-leaflet";
import {useStore} from "../store.ts";
import L from "leaflet";
import {Popover, Menu, MenuButton, MenuList, MenuItem, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, Box} from "@chakra-ui/react";
import {DroneStationIcon, DroneStationCircle, DroneStationGradientCircle} from "./MapViewMarker.tsx";
import {useEffect, useRef, useState} from "react";
import React from "react";

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

const EVENT_TYPES = [
    { label: "Wypadek", value: "accident" },
    { label: "Pożar", value: "fire" },
    { label: "Zdarzenie społeczne", value: "social" },
    { label: "Inne", value: "other" },
];

function ContextMenuHandler({ onContextMenu }: { onContextMenu: (e: any) => void }) {
    useMapEvent('contextmenu', onContextMenu);
    return null;
}

export const MapViewComponent: React.FC<{ onCreateEvent?: (event: any) => void }> = ({ onCreateEvent }) => {
    const centerLocation = useStore((state) => state.map.center);
    const droneStations = useStore((state) => state.stations)
    const [contextMenu, setContextMenu] = useState<{lat: number, lng: number, x: number, y: number} | null>(null);
    const [showTypeMenu, setShowTypeMenu] = useState(false);

    // Fix leaflet's default icon issue in many bundlers:
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: import('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: import('leaflet/dist/images/marker-icon.png'),
        shadowUrl: import('leaflet/dist/images/marker-shadow.png'),
    });

    // Funkcja do obsługi wyboru typu zdarzenia
    const handleTypeSelect = (type: string) => {
        if (contextMenu && onCreateEvent) {
            const event = {
                id: Math.random().toString(36).substring(2, 9),
                type,
                lat: contextMenu.lat,
                lng: contextMenu.lng
            };
            onCreateEvent(event);
        }
        setContextMenu(null);
        setShowTypeMenu(false);
    };

    // Obsługa kliknięcia PPM na mapie
    const handleContextMenu = (e: any) => {
        e.originalEvent.preventDefault();
        setContextMenu({
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            x: e.originalEvent.clientX,
            y: e.originalEvent.clientY
        });
        setShowTypeMenu(false);
    };

    // Obsługa zamykania menu po kliknięciu poza nim
    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!contextMenu) return;
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setContextMenu(null);
                setShowTypeMenu(false);
            }
        };
        setTimeout(() => document.addEventListener('mousedown', handleClick), 0);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [contextMenu]);

    return (
        <Box position="relative" w="100%" h="100%">
            <MapContainer
                center={[centerLocation.latitude, centerLocation.longitude]}
                zoom={13}
                style={{height: "100%", width: "100%"}}
            >
                <ScaleControl />
                <ContextMenuHandler onContextMenu={handleContextMenu} />
                {droneStations.map(station => (
                    <React.Fragment key={station.name}>
                        <DroneStationGradientCircle center={[station.position.latitude, station.position.longitude]} />
                        <Marker
                            position={[station.position.latitude, station.position.longitude]}
                            icon={DroneStationIcon}
                        >
                            <Popover>Custom styled marker</Popover>
                        </Marker>
                    </React.Fragment>
                ))}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
            </MapContainer>
            {/* Menu kontekstowe */}
            {contextMenu && (
                <Box ref={menuRef} position="fixed" left={contextMenu.x} top={contextMenu.y} zIndex={9999} bg="white" borderRadius="md" boxShadow="md" px={2} py={1} minW="auto" w="auto" fontSize="xs" border="1px solid #e5e7eb">
                    {!showTypeMenu ? (
                        <Box
                            as="button"
                            display="flex"
                            alignItems="center"
                            gap={1}
                            px={2}
                            py={0.5}
                            borderRadius="sm"
                            fontSize="xs"
                            color="gray.700"
                            bg="white"
                            _hover={{ bg: 'gray.100' }}
                            border="none"
                            boxShadow="none"
                            onClick={() => setShowTypeMenu(true)}
                            cursor="pointer"
                            minW="auto"
                        >
                            <Box as="span" fontWeight="bold" fontSize="sm" lineHeight={1}>+</Box> Utwórz zdarzenie
                        </Box>
                    ) : (
                        <Accordion allowToggle defaultIndex={0}>
                            <AccordionItem border="none">
                                <AccordionButton _expanded={{ bg: "blue.50" }} fontSize="xs" px={2} py={1}>
                                    Wybierz typ zdarzenia
                                </AccordionButton>
                                <AccordionPanel pb={1} px={2}>
                                    {EVENT_TYPES.map(type => (
                                        <Button key={type.value} w="100%" my={0.5} py={0.5} px={2} fontSize="xs" borderRadius="sm" onClick={() => handleTypeSelect(type.label)}>
                                            {type.label}
                                        </Button>
                                    ))}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    )}
                </Box>
            )}
        </Box>
    );
}