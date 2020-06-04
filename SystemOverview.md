# System Overview

An explanation of what we're doing and why.

As was mentioned in the [Readme](README.md), this project was designed to be both cheap and easy to execute for a person of any skill level. This is a driving factor behind much of the decisions.

# Summary

This project outlines a robotic control system. The robot is comprised principally of a RaspberryPi computer and an external motor shield, alongside motors and a battery. The PI hosts a Webserver. A controller connects to this Webserver and is served a HTML/CSS/Javascript based Webapp. The Webapp communicates via Websockets to a Websockets server running on the PI. The PI interprets these packets and relays information to the motor controller, ultimately resulting in motion.

# Specifics

In this specification, we utilize a *RaspberryPI-Zero W* which is configured to host its own WIFI network. *IP-Tables*, a linux utility, is configured to route all packets to the Pi's webserver (excluding those directed at the websockets server). The PI utilizes *Apache HTTP Server* to host the website. The websockets server runs through the *Websockets* python module. The client side of the websocket connection is managed through vanilla *Javascript*, which is loaded to the controller on each connection. The controller is any device capable of joining the PI's WIFI network and displaying arbitrary webpages (i.e. any device with a web browser). Traditionally, this is assumed to be a smartphone. The motor controller is an Adafruit Motor Bonnet which communicates to the pi via a python module (which itself runs on I2C (which runs on the pi's GIPO pins)). 

# The Gaps

While the examples sections provides some quick start code, there is many details that are open for exploration. For example, the protocol specification of the websockets connection is open to development. Additionally, the development of the controller (user) interface is open to explorations. Finally, this program allows for engagement in mechanical design (more info below).

# Diagram

![MaterModelDiagram](Media/ControlsImages/RobotWiring.jpg)

# Purchase

The majority of parts were purchased from ADAFruit. All in, the total cost is around $80. To have the same model as configured, the items needed are:

Name | Adafruit Part number | Qty
-----|----------------------|----
Raspberry Pi Zero W (with headers) | 3708 | 1
Motor Bonnet | 4280 | 1
TT motor | 3777 | 2-4
Micro SD Card | 1294 | 1

Additionally, you may want to purchase:

Name | Adafruit Part number | Qty
-----|----------------------|----
Mini HDMI to HDMI | 2819 | 1
MicroUSB to Ethernet + USB | 2992 | 1
LIPO Battery Pack (w/ 2 Outputs) | 4288 | 1
USB Breakout | 4448 | 1

Finally, these items may be helpful:

* External keyboard/monitor
* Soldering setup
* Wire Strippers
* 3d Printer/Filament

# Troubleshooting

Almost all problems can be divided into two catagories:

1. I can't connect
1. It should do X but instead it does Y

### I can't connect

This is a problem with the way your packets are configured. Consider the two scenarios where the pi is a client on a larger network vs. where it hosts its own network (images below). In the former case, unless you control that network and its packet routing protocols. You need to access the address of the pi directly. In the latter case, the PI is (assuming you followed te setup described here) at address `192.168.4.1` and the PI routes all incoming packets to itself. That is, any address will resolve to the pi directly. 

There exists another scenario where the PI is both a host and a client. For example, the pi may host a wifi network that the clients can connect to. At the same time, the pi may utilize a USB-Ethernet bridge to connect to a larger network. In the setup steps provided, these two networks are not bridged. That is the networks are functionally completely separate.

![Pi as Master](Media/ControlsImages/PiMaster.jpg)

![Pi as Client](Media/ControlsImages/PiClient.jpg)

If you can't connect, take a moment and think about which diagram you are in above. Next ask yourself the following questions:

1. Where are my packets starting?
1. Where should my packets end up?
1. How do they make that journey?

Hopefully you now know whats wrong. A word of warning, some devices may automatically switch your network. For example, assume your phone has access to your home WIFI and the PI's WIFI. You were connected to the PI's network, but tried to access Google. Your device may realize that the site is unreachable, and try to fail over to the other network. When this succeeds, it may remain on that network and not switch back. 

When the PI is configured as a client, you will need to know the local IP address of the PI directly. There is a number of ways to do this, and you will need to google based on your scenario. One thing that may be helpful is knowing the *MAC Address* of the Pi. The easiest way to find either of these is to connect to the PI as a master and run `arp -a` in the command line (Windows) or SSH into the PI and run `ifconfig`.

### X vs. Y

Your code is probably buggy. You should find a friend to help you debug. If you don't have a friend, ask in discord. Those people are generally nice.