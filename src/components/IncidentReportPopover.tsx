import {
    Button,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    Select,
    Stack,
    Tag,
    TagLabel,
    TagCloseButton,
    Textarea,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import {useStore} from "../store.ts";
import type {IncidentType, IncidentData} from "../models/IncidentPopupView.ts";


const INCIDENT_OPTIONS: IncidentType[] = ['collision', 'breakdown', 'obstruction', 'fire', 'other'];

export const IncidentReportPopover = () => {
    const save = useStore((state) => state.view.incidentPopup.save)
    const isOpen = useStore((state) => state.view.incidentPopup.visible);
    const [formData, setFormData] = useState<IncidentData>({ incidentType: [] });

    const addIncidentType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as IncidentType;
        if (value && !formData.incidentType?.includes(value)) {
            setFormData((prev) => ({
                ...prev,
                incidentType: [...(prev.incidentType || []), value],
            }));
        }
        e.target.value = ''; // Reset select
    };

    const removeIncidentType = (value: IncidentType) => {
        setFormData((prev) => ({
            ...prev,
            incidentType: (prev.incidentType || []).filter((t) => t !== value),
        }));
    };

    const handleNumberChange = (field: keyof IncidentData) => (_: string, value: number) => {
        setFormData((prev) => ({ ...prev, [field]: isNaN(value) ? undefined : value }));
    };

    const handleInputChange = (field: keyof IncidentData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = () => {
        console.log('Submitting incident report:', formData);
        save(formData);
    };

    return (
        <Popover isOpen={isOpen}>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Report Road Incident</PopoverHeader>
                <PopoverBody>
                    <Stack spacing={3}>
                        <FormControl>
                            <FormLabel>Incident Types</FormLabel>
                            <Select placeholder="Add type..." onChange={addIncidentType}>
                                {INCIDENT_OPTIONS.map((type) => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </Select>
                            <Wrap mt={2}>
                                {(formData.incidentType || []).map((type) => (
                                    <WrapItem key={type}>
                                        <Tag size="md" variant="subtle" colorScheme="blue">
                                            <TagLabel>{type}</TagLabel>
                                            <TagCloseButton onClick={() => removeIncidentType(type)} />
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Number of Casualties</FormLabel>
                            <NumberInput min={0} onChange={handleNumberChange('numberOfCasualties')}>
                                <NumberInputField />
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Number of Vehicles Involved</FormLabel>
                            <NumberInput min={0} onChange={handleNumberChange('numberOfVehicles')}>
                                <NumberInputField />
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Priority</FormLabel>
                            <Select placeholder="Select priority" onChange={handleInputChange('priority')}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Location</FormLabel>
                            <Input placeholder="e.g., Highway 8, Exit 12" onChange={handleInputChange('location')} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Location Notes</FormLabel>
                            <Textarea placeholder="e.g., left lane blocked by truck" onChange={handleInputChange('locationNotes')} />
                        </FormControl>

                        <Button colorScheme="blue" onClick={handleSubmit}>
                            Confirm Incident
                        </Button>
                    </Stack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
