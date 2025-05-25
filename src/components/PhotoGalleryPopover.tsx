import React, { useState } from "react";
import {
    Box,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Image,
    SimpleGrid,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import type {Photo} from "../models/Mission.ts";

interface PhotoGalleryPopoverProps {
    photos: Photo[]; // array of photo URLs
}

export const PhotoGalleryPopover: React.FC<PhotoGalleryPopoverProps> = ({ photos }) => {
    const {onOpen} = useDisclosure();
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const photoUrls = photos.flatMap(photo => [photo.rgbUrl, photo.thermalUrl, photo.lidarUrl]).filter(url => url); // Flatten and filter out empty URLs

    return (
        <>
            <Popover isLazy>
                <PopoverTrigger>
                    <Button size="sm" colorScheme="blue" onClick={onOpen} isDisabled={photoUrls.length === 0}>
                        View Photos ({photoUrls.length})
                    </Button>
                </PopoverTrigger>
                <PopoverContent bg="gray.800" color="white" maxW="400px" maxH="300px" overflowY="auto">
                    <PopoverArrow bg="gray.800" />
                    <PopoverCloseButton />
                    <PopoverHeader borderBottom="1px solid" borderColor="gray.700" fontWeight="bold">
                        Photo Gallery
                    </PopoverHeader>
                    <PopoverBody>
                        {photoUrls.length === 0 ? (
                            <Box color="gray.400" fontSize="sm" textAlign="center" py={4}>
                                No photos available
                            </Box>
                        ) : (
                            <SimpleGrid columns={3} spacing={2}>
                                {photoUrls.map((url, idx) => (
                                    <Image
                                        key={idx}
                                        src={url}
                                        alt={`Photo ${idx + 1}`}
                                        cursor="pointer"
                                        borderRadius="md"
                                        _hover={{ opacity: 0.8 }}
                                        onClick={() => setSelectedPhoto(url!)}
                                        objectFit="cover"
                                        boxSize="100px"
                                    />
                                ))}
                            </SimpleGrid>
                        )}
                    </PopoverBody>
                </PopoverContent>
            </Popover>

            {/* Modal for enlarged photo */}
            <Modal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} isCentered size="xl">
                <ModalOverlay bg="blackAlpha.800" />
                <ModalContent bg="gray.900" color="white" borderRadius="md">
                    <ModalCloseButton />
                    <ModalBody p={4}>
                        {selectedPhoto && (
                            <Image
                                src={selectedPhoto}
                                alt="Enlarged photo"
                                borderRadius="md"
                                maxH="80vh"
                                mx="auto"
                                objectFit="contain"
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
