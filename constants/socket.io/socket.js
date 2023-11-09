import { io } from "socket.io-client";
import { API_URL } from "../../ipConfig";
export const socket = io(`http://${API_URL}:3002`)