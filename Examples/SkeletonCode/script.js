mySocket = null; //global variable for storing the socket connection

//called once on page load
function initFunction() {
    s = "ws://" + myHost + ":" + myPort;
    console.log("Client started. Tying connection on: " + s)

    setStatus("Socket Connecting", "yellow")

    //create the socket object
    const socket = new WebSocket(s)

    //add the callbacks as necessary
    socket.onopen = onSocketOpen; //called when connection established
    socket.onerror = onSocketError; //called when error
    socket.onmessage = onSocketReceive; //called each message received
    socket.onclose = onSocketClose; //called each close
}

//called when the socket establishes a connection to the server
function onSocketOpen(event) {
    setStatus("Socket Opened", "lime")
    console.log("Socket Opened");

    //now that the socket is properly opened, capture it
    mySocket = this; //this refers to the socket object
}

//called on a socket error
//   most commonly, this is due to connection timeout
//most errors also cause the socket to close, 
//   calling onclose callback after the onerror callback
function onSocketError(event) {
    setStatus("Socket Error", "#f53636"); //set background to a soft red color
    console.log("Socket Error");
}

//called when the socket is closed
function onSocketClose(event) {
    setStatus("Socket Closed", "#f53636"); //set background to a soft red color
    console.log("Socket Closed");

    //now that the socket is invalid, remove it
    mySocket = null;
}

//called when the socket receives data
function onSocketReceive(event) {
    console.log("Message Received '" + event.data + "'");
    
    //update the output to reflect the value
    document.getElementById("outputBar").innerHTML = event.data;
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

function buttonSend(){
    //get the contents in the input field and send it to the server
    send(document.getElementById("inputField").value);
}

//set the status bar to contain the message and color specified
function setStatus(message, color){
    element = document.getElementById("statusBar");
    element.style.backgroundColor = color;
    element.innerHTML = message;
}