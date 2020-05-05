# Setup

## Overview

Initial setup of the pi can be accomplished in one of two ways. Both are detailed in this document. 

1. Via Pre-Configured Image
1. Via Manual Setup

## Via Pre-Configured Image

This is by far the easier of the two methods. An image of the pi following the conclusion of manual setup is provided in this repo. Simply download that image and flash the sd card. Then, the configured cad can be inserted into the pi and all the setup should be complete. 

#### TODO - can use pi imager instead right?

Flashing the sd card is a relatively standard operation. For Windows, this is generally done via `Win32 Disk Imager`; for Linux/Mac, via the terminal. The exact commands and steps are available throughout the internet, but we have found [this tutorial](https://magpi.raspberrypi.org/articles/back-up-raspberry-pi) particularly helpful.

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

The first step involves configuring the blank OS on the raspberry pi. For this tutorial, we use `Raspbian Lite`, a command line operating system. For this, we need the `Raspberrypi Imager` available [here](https://www.raspberrypi.org/downloads/). This item configures the raw os onto the SD card. You can read more about it [here](https://www.raspberrypi.org/blog/raspberry-pi-imager-imaging-utility/). Simply select `Raspbian Lite ` as the OS (its under `Raspbian (other)`) and write it to the SD card.

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

### Text Editor

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

This section will enable the WIFI as an access point, allowing other devices to connect to a network generated by the pi. This is an abridged version of the [tutorial here](https://www.raspberrypi.org/documentation/configuration/wireless/access-point-routed.md)

Install `hostapd`, the software that manages the access point, and make it run on startup.

```
sudo apt install hostapd
sudo systemctl unmask hostapd
sudo systemctl enable hostapd
```

Install `dnsmasq`, a network manager software

`sudo apt install dnsmasq`

Configure the `DHCP` server so that the raspberry pi's IP is known:

`sudo vim /etc/dhcpcd.conf`

and append at the end of the file:

```
interface wlan0
    static ip_address=192.168.4.1/24
    nohook wpa_supplicant
```

Now for `dnsmasq`:

`sudo vim /etc/dnsmasq.conf`

and append:

```
interface=wlan0
dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
domain=wlan 
address=/gw.wlan/192.168.4.1
```

And now for `hostapd`:

`sudo vim /etc/hostapd/hostapd.conf`

As this file does not exist, an empty file is created. The following information is needed:
```
country_code=US
interface=wlan0
ssid=NameOfNetwork
hw_mode=g
channel=7
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

Finally, we need to allow access to the WIFI antenna:

`sudo rfkill unblock wlan`

The WIFI should be visible following an `reboot`