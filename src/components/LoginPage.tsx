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
    Image,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {FaUserAlt, FaLock, FaShieldAlt} from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaShieldAlt = chakra(FaShieldAlt);

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
                    <CFaShieldAlt color={primaryColor} boxSize="60px" mb={4}/>
                    <Heading color={primaryColor} size="xl" fontWeight="bold">
                        RESCUE EYE
                    </Heading>
                    <Text color="gray.600" mt={2} fontSize="sm">
                        System Szybkiego Reagowania i Oceny Sytuacji
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
                                        placeholder="Adres email służbowy"
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
                                        placeholder="Hasło"
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
                                            {showPassword ? "Ukryj" : "Pokaż"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText textAlign="right">
                                    <Link color={secondaryColor} fontSize="sm">
                                        Zapomniałeś hasła?
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
                                Zaloguj się
                            </Button>
                        </Stack>
                    </form>
                </Box>
                <Text color="gray.600" fontSize="sm">
                    Dostęp tylko dla upoważnionych służb
                </Text>
            </Stack>
        </Flex>
    );
};

export default LoginPage;