import {
    Box,
    ChakraProvider,
    theme,
} from "@chakra-ui/react"
import {useState} from "react";
import {HomePage} from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import {useWindowHeight} from "@react-hook/window-size";

export const App = () => {
    const windowHeight = useWindowHeight();
    const [loggedIn, setLoggedIn] = useState(false);
    return <ChakraProvider theme={theme}>
        <Box maxW="100%" backgroundColor={"gray.200"} height={windowHeight}>
            {loggedIn ? <HomePage/> : <LoginPage onLogin={(value: boolean) => {
                setLoggedIn(value)
            }}/>}</Box>

    </ChakraProvider>
};