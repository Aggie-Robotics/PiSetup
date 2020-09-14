# Setup

## Overview

Initial setup of the pi can be accomplished in one of two ways. Both are detailed in this document. 

1. Via Pre-Configured Image
1. Via Manual Setup

In either case, you will need the `RaspberryPi Imager` available [here](https://www.raspberrypi.org/downloads/). This utility configures os images (think copies) onto the SD card. You can read more about it [here](https://www.raspberrypi.org/blog/raspberry-pi-imager-imaging-utility/).

## Via Pre-Configured Image

This is by far the easier of the two methods. An image of the pi following the conclusion of manual setup is provided in this repo. Simply download that image and flash the sd card. Then, the configured cad can be inserted into the pi and all the setup should be complete. 

Flashing the sd card is a relatively standard operation. First, download the latest binary image file from the releases section of github. This file is a compressed disk image. It is around `1 GB` compressed and `2.7 GB` uncompressed.

Using the `Raspberry Pi Imager`, select `Use Custom Image` and navigate to the image you downloaded. Then write the image to the SD card. The pi is now configured.

The image has `SSH` enabled. The username and password are `pi` and `raspberry` respectively.
The image creates a Wifi network with name `RobotPi0` and password `0123456789`.

Note, the image has had its file system reduced to save space. While the image has around 500 mb allocated space available, more space may be required. If your SD card has more storage (it should), you can expand the file system. This is done via the command:

`sudo raspi-config`

The options are under `7 Advanced Options > A1 Expand Filesystem`. This will expand the file system to fill the SD card, allowing up to the the capacity of the card of data (minus around 2GB for system files). 

Word of warning: not all SD cards are equal. Just because two cards are the same size, say `16 GB`, their actual storage may be slightly different. In this case, if the image is resized to the larger card, it will be unable to be placed on the smaller card. It is possible to resize images down, but this requires a program called `gparted`, a linux utility. That is to say, its complicated to do in Windows.

## Via Manual Setup

### Background

This section details the setup steps required for configuring the pi manually. For this, you will need the following pieces of equipment.

* An external keyboard
* An external display

Note, if using the pi-zerow, you will likely need

* An micro-USB to USB type A adapter
* An mini-HDMI to HDMI adapter

Additionally, depending on the configuration of the pi, you may find it easiest to also have a usb to ethernet bridge. This allows for the pi to host its own wifi network (for connection) while also allowing for an outbound internet connection (for downloading libraries) via ethernet. Without this, you will need to configure your raspberry pi in `client mode` and `ssh` into the pi to perform the necessary configuration.

In either scenario, you will need the keyboard and display for the initial configuration of `ssh`. See the document `SSH_Details` for more information.

### Operating System Setup

The first step involves configuring the blank OS on the raspberry pi. For this tutorial, we use `Raspbian Lite`, a command line operating system.  Using the `Raspberry Pi Imager`, simply select `Raspbian Lite ` as the OS (its under `Raspbian (other)`) and write it to the SD card.

You should now be able to connect the pi to power and an external display and see the pi terminal. Note the first setup does some extra configuration and mat take some time to complete, however the display should show something immediately.

When prompted for login, the default username and password are `pi` and `raspberry` respectively.

### Enabling SSH

`SSH` stands for secure shell. It allows you to use one computer's keyboard and display to control another. Enabling ssh will allow for remote access into the pi, bypassing the need for the external display and keyboard.

The steps here are a greatly abridged version of the steps in [this guide](https://www.raspberrypi.org/documentation/remote-access/ssh/). To enable ssh type:

`sudo systemctl enable ssh`

SSH will now run on the next startup. To make it run now, type 

`sudo systemctl start ssh`

Now a connection should be possible from your favorite ssh client. An image of the pi at this point has been provided.

### Background Setup

There are some initial setup configurations that need to be applied before more configuration can be attempted. 

#### Root Access and Sudo

For most commands going forward, root access will be required. Every command can be prepended with `sudo` or you can log in with root permissions via the command `sudo -i`. Doing this is generally bad practice as a improper (or mis-typed) command can greatly damage the system. However, as this is a raw image, the worst that could happen is needing to restart from the beginning.

#### Outbound Ethernet

Having internet is necessary for installing things. You can check that you have internet by trying to `ping` google's servers via

`ping 8.8.8.8`

If everything is working correctly, you should see something like `64 bytes from 8.8.8.8 ... time=##.## ms`. If you see a `timeout` that means you probably don't have internet. If you see a `prohibited` then someone has stopped you along the way. This is likely you Internet Service Provider. In this case, you may need to log into some account and add the pi's mac address manually.

#### Apt-Get

Apt-get is the linux package manager, it helps to install things. As such, we should make sure that it is up to date via the command:

`sudo apt-get update`

#### Text Editor

Next, you may want to install your favorite text editor, `Vim`. While Raspbian comes preconfigured with `Nano` and `Vi`. While some people may tell you `Nano` is better, its worse, and that opinion is [non debatable](https://i.redd.it/2xl0xqm2yrk01.png).

In either case, should you want `Vim`, you need to

`sudo apt-get install vim`

If you don't know what one you want, you may want to take a moment, visit google, and decide which one you will need. A text editor will be necessary for the remainder of the configuration. If you think both are valid, review [this](https://www.youtube.com/watch?v=JY6RyRkl9uo).

For this setup, commands will be presented using `vim` as the editor, but you ***can*** use any editor you want. 

#### Keyboard

Next we set the keyboard layout. RaspberryPi is initially configured with the **G**reat **B**ritian keyboard layout. While this is similar to the **U**nited **S**tates layout, there are a few differences, principally the `@` and `"` are swapped. To change this setting, type

`sudo vim /etc/default/keyboard`

This opens the Keyboard Configuration File. Change the line `XKBLAYOUT="gb"` to be `XKBLAYOUT="us"`

This change will not take effect until the next restart. You can do that now via `reboot`

#### Configure WIFI

This section will enable the WIFI as an access point, allowing other devices to connect to a network generated by the pi. This is an abridged version of the [tutorial here](https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md). ([FIX](https://web.archive.org/web/20200423125446/https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md))

##### Background

First we install two pieces of software: `dnsmasq` and `hostapd` via:

`sudo apt install dnsmasq hostapd`

Then stop them so that we can alter their config files

```
sudo systemctl stop dnsmasq
sudo systemctl stop hostapd
```

Then edit the static ips via:
`sudo vim /etc/dhcpcd.conf`

and appending

```
interface wlan0
    static ip_address=192.168.4.1/24
    nohook wpa_supplicant
```

And finally reboot via

`sudo service dhcpcd restart`

##### DHCP

Next we need to configure the `DHCP` server:

`sudo vim /etc/dnsmasq.conf`

and append:

```
interface=wlan0
dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
```

and restart the service:

`sudo systemctl start dnsmasq`

##### HOSTAPD

We need to create the configuration file via:

`sudo vim /etc/hostapd/hostapd.conf`

and populate it with the fields:

```
interface=wlan0
driver=nl80211
ssid=NameOfNetwork
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=AardvarkBadgerHedgehog
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
```
The following fields may need to be changed:

* `ssid` is the network name

* `hw_mode` is the IEEE 802.11# WIFI type

* `channel` is the WIFI channel

* `wpa_passphrase` is the network password

We now need to tell the system where to find this configuration file.

`sudo vim /etc/default/hostapd`

Find the line with `#DAEMON_CONF`, and replace it with this:

`DAEMON_CONF="/etc/hostapd/hostapd.conf"`

finally, we need to restart `HOSTAPD` and have it run on startup
```
sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd
```

The WIFI network specified by `ssid` should now be visible and should be visible after a `reboot`.

Finally, check the ip address assigned to the pi via `hostname -I`. `192.168.4.1` should be visible, in addition to any other interfaces, such as ethernet.

#### Configure Routing

Now we need to setup the routing rules so that connections are sent to the proper location on the pi. This allows the controller to use any ip to connect to the pi's internal server. This step is optional as connecting to the static ip of `192.168.4.1` should always redirect to the pi.

First configure the `IPTables` via:

```
sudo iptables -t nat -A PREROUTING -p tcp -j DNAT –-to-destination 192.168.4.1
sudo iptables -A FORWARD -d 192.168.4.1/32 -p TCP -j ACCEPT
```

The first line redirects any inbound connection to the pi's ip (`192.168.4.1`). The second approves any (and only) connection targeted to the pi.

Next, the `IPTables` configuration needs to be saved to an external file:

`sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"`

Finally, we want to restore this configuration every time the pi reboots. This is done by editing the startup script located at:

`sudo vim /etc/rc.local`

and appending (before the `exit 0`):

`iptables-restore < /etc/iptables.ipv4.nat`

### Installing Apache

For the webserver, we use `Apache`. Apache is a commonly used, well supported open source webserver. It can obtained by:

`sudo apt-get install apache2`

Apache will begin running immediately and will be pre-configured to resume on startup. At this point, you should be able to connect to the pi via a WIFI device and go to any ip address (ex `1.1.1.1`). When doing so, the pi should redirect you to the default Apache page. This should persist though a `reboot`. In fact, things should work without needing to login to the pi.

Note, the default webpage is `/var/www/html/index.html`. Editing this page will edit what is shown.


### Installing Python

While Apache manages the html, we also run a `python` server to manage the `websockets`connection. `Websockets` is a communication protocol that provides sockets (data-streaming) behavior over html. 

Python3 should already be installed, but if it isn't:

`sudo apt-get install python3`

However, `PIP`, the python package manager, is not installed by default. This can be fixed via:

`sudo apt-get install python3-pip`

Next, we create an empty python project. Since Apache utilizes `/var/www/html`, creating the directory `/var/www/python` and placing this file in there would allow for both the html and python to be managed by one `git` repository rooted in `/var/www/`. To realize this, create the directory and file:

```
sudo mkdir /var/www/python
sudo vim /var/www/python/server.py
```

Inside the file place:

`print("Python Server Running!")`

Now, to verify everything is running, try:

`python /var/www/python/server.py`

It should print `Python Server Running!`.

Finally, we need to make the python program run on startup. This is accomplished by editing:

`sudo vim /etc/rc.local`

to include 

`python3 /var/www/python/server.py &`

The trailing `&` puts the server in the background, allowing the startup to continue without waiting for the python process to finish. This is especially important in larger python projects where the python server waits for connection.

Now if you `reboot`, somewhere near the end of the boot process, the line `Python Server Running!` should print.

### Enabling I2C

I2C is a communication protocol that is utilized to communicate between the Motor Bonnet and the RaspberryPI. This can be trivially enabled via `sudo raspi-config`. The specific setting is under `5 Interfacing Options > P5 I2C`.

Using the 

## Conclusion

Thats it. All that remains is to edit the `python/server.py` and `html/index.html` to have the proper functionality.

## Appendix

There are a couple other configuration things that may need to be done to fully configure things:

#### Git
    
`Git`, a source control program, allows you to synchronize files across devices. Specifically, this would allow software development on a more refined text editor on a laptop and transfer of the files later. To get `Git`:

`sudo apt-get install git`

`Github` is a free `Git` service.

#### Python Packages

There are two python packages that are utilized pretty heavily in our software development. You will likely need to install them at some point, so why not install them now?

##### Websockets

This library provides the websockets interface. 

`pip3 install websockets`

##### Adafruit Motor_kit

This library interfaces with Adafruit motor bonnet and allows for the control of the motors. 

`pip3 install adafruit-circuitpython-motorkit`
