import { io } from "socket.io-client";

//const url = "https://ride-share-backend.onrender.com";
const url = "http://localhost:8000";

const socket = io.connect(url);

export { socket };
