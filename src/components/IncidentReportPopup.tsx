import React, {useRef, useState} from "react";
import {
    Button, Card, CardBody, CardFooter, CardHeader, Text, useColorModeValue,
    useOutsideClick, VStack
} from "@chakra-ui/react";
import {useStore} from "../store.ts";

export type EventType = 'accident' | 'fire' | 'social' | 'other';

export const EVENT_TYPES: { label: string, value: EventType }[] = [
    {label: "Wypadek", value: "accident"},
    {label: "Pożar", value: "fire"},
    {label: "Zdarzenie społeczne", value: "social"},
    {label: "Inne", value: "other"},
];

export interface IncidentReportPopupProps {
}

export const IncidentReportPopup: React.FC<IncidentReportPopupProps> = () => {
    const save = useStore((state) => state.view.incidentPopup.save)
    const cancel = useStore((state) => state.view.incidentPopup.cancel);
    const isOpen = useStore((state) => state.view.incidentPopup.visible);
    const [selectedType, setSelectedType] = useState<EventType | undefined>(undefined);
    const location = useStore((state) => state.view.incidentPopup.location);
    const position = useStore((state) => state.view.incidentPopup.position);
    const handleSubmit = (type: EventType) => {
        save({
            incidentType: type,
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        });
        setSelectedType(undefined);
    };

    const onClose = () => {
        setSelectedType(undefined);
        cancel();
    };

    const ref = useRef(null);
    useOutsideClick({
        ref: ref,
        handler: () => onClose(),
    });


    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const primaryColor = "blue.700";
    const secondaryColor = "blue.500";
    return (isOpen && <Card
            ref={ref}
            position="fixed"
            top={position.y}
            left={position.x}
            transform="translate(-50%, -50%)"
            zIndex={1000}
            bg={bgColor}
            borderRadius="lg"
            boxShadow="xl"
            width="320px"
            fontSize="sm"
            border="1px solid"
            borderColor={borderColor}
        >
            <CardHeader pb={1} pt={3} px={4}>
                <Text fontSize="md" fontWeight="semibold" color={primaryColor}>
                    Incident Report
                </Text>
            </CardHeader>

            <CardBody px={4} pt={0} pb={2}>
                <VStack spacing={2}>
                    {EVENT_TYPES.map((type) => (
                        <Button
                            key={type.value}
                            size="sm"
                            w="100%"
                            variant={selectedType === type.value ? "solid" : "outline"}
                            colorScheme="blue"
                            borderRadius="md"
                            fontWeight="medium"
                            color="gray.800"
                            _hover={{
                                bg: selectedType === type.value ? primaryColor : `${secondaryColor}.50`,
                            }}
                            onClick={() => setSelectedType(type.value)}
                        >
                            {type.label}
                        </Button>
                    ))}
                </VStack>
            </CardBody>

            <CardFooter pt={0} pb={3} px={4}>
                <Button
                    variant="solid"
                    colorScheme="blue"
                    size="sm"
                    w="100%"
                    borderRadius="md"
                    fontWeight="semibold"
                    color="gray.800"
                    _hover={{ bg: secondaryColor }}
                    isDisabled={selectedType === undefined}
                    onClick={() => handleSubmit(selectedType!)}
                >
                    Report
                </Button>
            </CardFooter>
        </Card>
    );
}