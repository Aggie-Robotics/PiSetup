class ConnectionBase {
    constructor(host, port) {
        this.host = host
        this.port = port
    }

    connect() {
        let s = "ws://" + this.host + ":" + this.port;
        console.log("Client started. Tying connection on: " + s);
    
        //create the socket object
        this.socket = new WebSocket(s);
    
        //add the callbacks as necessary
        this.socket.onopen = this.onSocketOpen; //called when connection established
        this.socket.onerror = this.onSocketError; //called when error
        this.socket.onmessage = this.onSocketReceive; //called each message received
        this.socket.onclose = this.onSocketClose; //called each close
    }

    //called when the socket establishes a connection to the server
    onSocketOpen(event) {
        console.log("Socket Opened");
    }

    //called on a socket error
    //   most commonly, this is due to connection timeout
    //most errors also cause the socket to close, 
    //   calling onclose callback after the onerror callback
    onSocketError(event) {
        console.log("Socket Error");
    }

    //called when the socket is closed
    onSocketClose(event) {
        console.log("Socket Closed");
        //now that the socket is invalid, remove it
        this.socket = null;
    }

    //called when the socket receives data
    onSocketReceive(event) {
        console.log("Message Received '" + event.data + "'");
    }

    //sends the input parameter into the socket
    send(message) {
        if (this.socket == null) {
            console.log("Cannot send message, socket is not connected.");
        }
        else {
            this.socket.send(message);
        }
    }
}