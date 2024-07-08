import { createContext } from "react";

const SocketContext = createContext({
    socketInitialized: false,
});

export default SocketContext;
