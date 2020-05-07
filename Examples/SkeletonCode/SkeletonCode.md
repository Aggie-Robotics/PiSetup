# Examples/SkeletonCode

This example shows builds on the echo server from `Examples/Fundamentals`. 

The server now takes command line args to specify the hostname and port: `server.py <hostname> <port>`. These are optional, and the default values are `192.168.4.1` and `8765`.

The Javascript now displays the connection status directly on the webpage. Additionally, there is a message field that allows the typing of messages to be sent to the server, the responses of which are displayed on the webpage.

Additionally, preliminary support for SIGINT (KeyboardInterrupt) is provided for the python server.