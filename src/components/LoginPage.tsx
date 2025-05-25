import React, {useState} from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    FormControl,
    FormHelperText,
    InputRightElement,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {FaUserAlt, FaLock} from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface LoginPageProps {
    onLogin?: (value: boolean) => void
}

const LoginPage: React.FC<LoginPageProps> = ({onLogin}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const primaryColor = "blue.700";
    const secondaryColor = "blue.500";

    return (
        <Flex
            flexDirection="column"
            width="100vw"
            height="100vh"
            backgroundColor="gray.50"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
                spacing={6}
            >
                <Box textAlign="center">
                    <Box display="flex" justifyContent="center" mb={4}>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                {/* Tarcza */}
                                <path d="M30 5C30 5 10 10 10 25C10 45 30 55 30 55C30 55 50 45 50 25C50 10 30 5 30 5Z" fill="#2B6CB0" stroke="#2B6CB0" strokeWidth="2"/>
                                {/* Oko */}
                                <ellipse cx="30" cy="30" rx="10" ry="6" fill="#fff"/>
                                <ellipse cx="30" cy="30" rx="4" ry="4" fill="#2B6CB0"/>
                                <ellipse cx="30" cy="30" rx="2" ry="2" fill="#fff"/>
                            </g>
                        </svg>
                    </Box>
                    <Heading color={primaryColor} size="xl" fontWeight="bold">
                        RESCUE EYE
                    </Heading>
                    <Text color="gray.600" mt={2} fontSize="sm">
                        System for Rapid Response and Situation Assessment
                    </Text>
                </Box>

                <Box 
                    minW={{base: "90%", md: "468px"}}
                    p={8}
                    bg={bgColor}
                    borderRadius="lg"
                    boxShadow="lg"
                    borderWidth="1px"
                    borderColor={borderColor}
                >
                    <form>
                        <Stack spacing={6}>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.400"/>}
                                    />
                                    <Input 
                                        type="email" 
                                        placeholder="E-mail address"
                                        size="lg"
                                        borderColor={borderColor}
                                        _hover={{ borderColor: secondaryColor }}
                                        _focus={{ borderColor: primaryColor, boxShadow: "none" }}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaLock color="gray.400"/>}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        size="lg"
                                        borderColor={borderColor}
                                        _hover={{ borderColor: secondaryColor }}
                                        _focus={{ borderColor: primaryColor, boxShadow: "none" }}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button 
                                            h="1.75rem" 
                                            size="sm" 
                                            onClick={handleShowClick}
                                            variant="ghost"
                                            color={secondaryColor}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText textAlign="right">
                                    <Link color={secondaryColor} fontSize="sm">
                                        Forgot your password?
                                    </Link>
                                </FormHelperText>
                            </FormControl>
                            <Button
                                size="lg"
                                type="submit"
                                colorScheme="blue"
                                bg={primaryColor}
                                _hover={{ bg: secondaryColor }}
                                width="full"
                                onClick={() => onLogin ? onLogin(true) : null}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
                <Text color="gray.600" fontSize="sm" textAlign="center" mt={4}>
                    Rescue Eye is a system designed to support rapid response and situation assessment in emergency situations.<br/>It provides real-time data and analytics to help authorized personnel make informed decisions.
                </Text>
            </Stack>
        </Flex>
    );
};

export default LoginPage;