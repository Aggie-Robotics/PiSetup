# Quick Start

1. Download the latest image from the releases tab 

1. Put this image on an sd card via either raspbery [pi imager utility](https://www.raspberrypi.org/downloads/) or Win32DiskImager

1. Provide power and go for it

1. See [Auxillary Operations](AuxillaryOperations.md) for some common actions

# Default Values

Key Values in the default image

## Accounts

* Default username = `pi`

* Default password = `raspberry`

## Root

* Root password, if prompted, is `AggieRobotics`

## Key Files

* Dir: `/var/www/html/`

* `index.html`

* `server.py`

## Wifi

* SSID (Network Name) = `Sumobot`

* Password = `AggieRobotics`

## DHCP

* Range `192.168.4.1` to `192.168.4.20`

* Host is `192.168.4.1`

* Lease Time is `24h`

## IPTables

* All inbound connections on all interfaces redirect to local
