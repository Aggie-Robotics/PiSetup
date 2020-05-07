import asyncio
import websockets
import sys
from signal import SIGINT, SIGTERM

#called once per connection
async def connectionHandler(websocket, path):
    print("New connection recieved.")
    async for message in websocket:
        print(f"Received new message '{message}'")
        await websocket.send(f"ECHO:{message}")

    #this part is executed after the websocket is closed by the client
    #if the socket is closed by the server (i.e. ctrl-c) this is not executed
    print("Connection lost.")


#if the python module has been launched as the main one
if __name__ == "__main__":
    #first, we allow for command line arguments formatted such:
    #   server.py <hostname> <port>
    #   where hostname and port are optional
    try:
        port = sys.argv[2]
    except IndexError:
        #The user did not provide an port argument
        port = "8765"

    try:
        host = sys.argv[1]
    except IndexError:
        host = "192.168.4.1"

    #next, write the host:port combo to a file that js can read.
    try:
        with open("hostPort.js", 'w') as fileOut:
            fileOut.write(f"myHost = '{host}';")
            fileOut.write(f"myPort = '{port}';")
        #with open() as syntax automatically closes the file on exit
    except (FileNotFoundError, FileExistsError, OSError) as e:
        print("Something went wrong trying to write the hostport.js file. Type:" + str(type(e)))

    print(f"Starting Server at {host}:{port}")

    #start the server
    server = websockets.serve(connectionHandler, host, port)
    
    try:
        #since the connection is asynchronous, we need to hold the program until its finished
        # under normal circumstances, this means we wait forever
        asyncio.get_event_loop().run_until_complete(server)
        asyncio.get_event_loop().run_forever()
        #any code down here would not be reachable until the server closes its socket
        # under normal circumstances, this means this code is unreachable

    except KeyboardInterrupt:
        #the interrupt was fired (ctrl-c), time to exit
        #note, the interrupt wont happen till the next async event happens
        print("Exiting via KeyboardInterrupt")
        exit(-1)