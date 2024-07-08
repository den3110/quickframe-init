import { io } from "socket.io-client";

export default class SocketClient {
    static _instance = null;

    _io = null;
    _url;

    _connected = false;

    constructor(url) {
        this._url = url;
    }

    static getInstance() {
        if (this._instance === null) {
            this._instance = new SocketClient("http://localhost:9001");
        }
        return this._instance;
    }

    connect(query) {
        if (this._io) {
            return new Promise((resolve, reject) => {
                resolve(this._io);
            });
        }

        this._io = io(this._url, {
            query,
        });

        return new Promise((resolve, reject) => {
            this._io.on("connect", (socket) => {
                resolve(socket);
                // console.log("WS connected");
            });
        });
    }

    socket() {
        return this._io;
    }
}
