import asyncio
import websockets

#called once per connection
async def connectionHandler(websocket, path):
    print("New connection recieved.")
    async for message in websocket:
        print(f"Received new message '{message}'")
        await websocket.send(f"ECHO:{message}")


#if the python module has been launched as the main one
if __name__ == "__main__":
    print("Starting Server")

    #This needs to match the one in the script.js
    host = "192.168.4.1" #for use when running on the pi
    # host = "localhost" #for use when debugging on the same machine (i.e. laptop)

    port = "8765" #any reasonably high value is probably valid

    #start the server
    server = websockets.serve(connectionHandler, host, port)

    #since the connection is asynchronous, we need to hold the program until its finished
    # under normal circumstances, this means we wait forever

    asyncio.get_event_loop().run_until_complete(server)
    asyncio.get_event_loop().run_forever()

    #any code down here would not be reachable until the server closes its socket
    # under normal circumstances, this means this code is unreachable