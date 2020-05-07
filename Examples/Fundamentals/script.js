mySocket = null; //global variable for storing the socket connection

//This needs to match the one in the server.py
host = "192.168.4.1" //for use when running on the pi
// host = "localhost" //for use when debugging on the same machine (i.e. laptop)

port = "8765" //any reasonably high value is probably valid

//called once on page load
function initFunction() {
    console.log("Client started")

    //create the socket object
    const socket = new WebSocket("ws://" + host + ":" + port)

    //add the callbacks as necessary
    socket.onopen = onSocketOpen; //called when connection established
    socket.onerror = onSocketError; //called when error
    socket.onmessage = onSocketReceive; //called each message received
    socket.onclose = onSocketClose; //called each close
}

//called when the socket establishes a connection to the server
function onSocketOpen(event) {
    console.log("Socket Opened");

    //now that the socket is properly opened, capture it
    mySocket = this; //this refers to the socket object
}

//called on a socket error
//   most commonly, this is due to connection timeout
//most errors also cause the socket to close, 
//   calling onclose callback after the onerror callback
function onSocketError(event) {
    console.log("Socket Error");
}

//called when the socket is closed
function onSocketClose(event) {
    console.log("Socket Closed");

    //now that the socket is invalid, remove it
    mySocket = null;
}

//called when the socket receives data
function onSocketReceive(event) {
    console.log("Message Received '" + event.data + "'");
}

//sends the input parameter into the socket
function send(message) {
    if (mySocket == null) {
        console.log("Cannot send message, socket is not connected.")
    }
    else {
        mySocket.send(message);
    }
}