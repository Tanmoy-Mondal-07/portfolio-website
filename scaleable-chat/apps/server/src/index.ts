import http from 'http'
import SocketService from './services/socket.js'

async function init() {
    const socketService = new SocketService()

    const httpServer = http.createServer()
    const PORT = process.env.PORT || 8000

    socketService.io.attach(httpServer)

    httpServer.listen(PORT, () => console.log("http server srarted at port ", PORT))

    socketService.initListeners()
}

init()