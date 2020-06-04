# TechnicalFoundation

This page is designed to provide a very brief overview of the background technologies that enable this project. It is in simple, interesting English that should get everyone up to speed. It is not intended to be a exhaustive (or even 100%-accurate) explanation of these concepts.

Words in **Bold** are technical words. The most essential ones are defined below. 

All [links](https://en.wikipedia.org/wiki/Main_Page) are to the relevant wikipedia page.

#### Items are in roughly *electrons to executables* order. 

# Computing Fundamentals

## Linux

[Linux](https://en.wikipedia.org/wiki/Linux) - an [Operating System](https://en.wikipedia.org/wiki/Operating_system) which is [Open Source](https://en.wikipedia.org/wiki/Free_and_open-source_software) (aka free).

## Raspberry Pi

[RaspberryPi](https://en.wikipedia.org/wiki/Raspberry_Pi) - a family of small computers that run on around 5v 250mA **DC current**. The **Raspberry Pi Zero W** is one of these computers that also contains an onboard **WIFI** chip. RaspberryPis traditionally run **Linux**, although they can run windows aswell. Their storage (including the operating system) is stored on a **micro-sd card**.  

## General Purpose Input-Output (GPIO)

[GPIO](https://en.wikipedia.org/wiki/General-purpose_input/output) - a set of pins on a a circuit or computer which provide ways of communicating between two pieces of hardware

## Secure Shell (SSH)

[SSH](https://en.wikipedia.org/wiki/Secure_Shell) - A method of interacting with one computer from another over the network, generally via command line interfaces.

# Networking Fundamentals

## The Network Stack (OSI Model)

[OSI Model](https://en.wikipedia.org/wiki/OSI_model) - a method of thinking about how devices within a network talk to one another. 

## Network Packet

[Network Packets](https://en.wikipedia.org/wiki/Network_packet) - a group of data sent between two devices on a network. Think of them like letters: there is an address and content. While you can put a lot in a letter, sometimes, if you're sending a long message you need multiple.

## Socket

[Socket](https://en.wikipedia.org/wiki/Network_socket) - a method of sending and receiving data over a network. Consist of an **address**, usually that of a computer, and a **port**. The **operating system** routs incoming packets to the program listening on a particular **port**. Generally, only one program can **bind** (use) a particular **port** at a time, but multiple **ports** can use one **network interface** (ex. ethernet cable, wifi chip) at a time.

## IP

[IP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) - A method of addressing devices on a network. Each device is given an **IP Address** that identifies it uniquely on the network. **IP Addresses** look like `###.###.###.###` where each `###` is in the range `[0,255]`. **IP Addresses** starting with `192` are internal to the network.

## Domain Name System (DNS)

[DNS](https://en.wikipedia.org/wiki/Domain_Name_System) - A procedure for resolving domain names (such as [google.com](google.com)) to an **IP Address**

## TCP

[TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) - A **protocol** (set of rules) that manage the routing of **Packets** through a network. 

## UDP

[UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) - A faster but less reliable **protocol**. An alternative to **TCP**

## Hypertext Transfer Protocol (HTTP) 

[HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) - a **protocol** that utilizes **IP** and **TCP** or **UDP** to communicate files and data across the web

## Websocket 

[Websocket](https://en.wikipedia.org/wiki/WebSocket) - a relatively new **protocol** that allows for the communication between **web applications** and a server directly. Raw **sockets** are not available to web apps due to some security concerns. The **websockets protocol** is designed to appear like standard **sockets** while running over a traditionally available **HTTP** connection.

## IP-Tables

A linux utility that routes **packets** and can filter/alter them for security or proxying reasons.

# Web Software

## HTML 

The language that provides the structure of a webpage. AKA - the skeleton

## CSS

The language that alters the appearance of a webpage. AKA - the skin

## Javascript

The language that makes thing happen on a webpage. AKA - the muscles

## Python

A programming language that is praised for its simple, understandable syntax.

## Apache 

An group producing **open source** software ([wikipedia link](https://en.wikipedia.org/wiki/The_Apache_Software_Foundation)). **Apache** also usually refers to [Apache HTTP Server](https://en.wikipedia.org/wiki/Apache_HTTP_Server), the webserver program released by the **Apache Group**. A **webserver** manages the incoming **HTTP** connections (usually on port 80), and provides the necessary files. Traditionally, the base file is called `index.html` but this can be changed in the configuration.

## Websockets (Python)

A python library that implements the **websocket protocol**

# Hardware Protocols

## Universal Serial Bus (USB)

Google it 

## Inter Integrated Circuit (I-Squared-C, IIC, I2C)

[I2C](https://en.wikipedia.org/wiki/I%C2%B2C) - a protocol utilizing two wires to communicate between multiple circuits on a single board. 


