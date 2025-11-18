import { Server } from "socket.io"
import { Redis } from "ioredis"
const serviceUri = process.env.AIVEN_PASSWORD!

const pub = new Redis(serviceUri);
const sub = new Redis(serviceUri);

class SocketService {
    private _io: Server;

    constructor() {
        console.log("init socket server");
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*',
            }
        })
        sub.subscribe('MESSAGES')
    }

    public initListeners() {
        const io = this.io;
        console.log('init socket listner');
        io.on('connect', async socket => {
            console.log('new socket connected', socket.id);

            socket.on('event:message', async ({ message }: { message: string }) => {
                console.log('New Message Recived', message);
                // publish this message to redis
                await pub.publish("MESSAGES", JSON.stringify({ message }));
            })

        })
        sub.on('message', (channel, message) => {
            if (channel === 'MESSAGES') {
                console.log('msg coming from redis');
                io.emit("message", message)
            }
        })
    }

    get io() {
        return this._io
    }

}

export default SocketService;