# Auxillary Operations

Other things that may need doing at some point

## Changing device Name or Account Username/Password

1. `sudo raspi-config`

## Changing root password

1. `sudo passwd root`

## Changing WIFI network name

1. `sudo vim /etc/hostapd/hostapd.conf`
    
1. ssid is network name

1. wpa_passphrase is network password

## Configure WIFI as Client

1.

## Uploading Files

1. Use any SFTP compatible device. For example, with filezilla use the host 'sftp://pi-ip'

1. After logging in, may need to go up several directories. Then into `/var/www/html`

1. Transfer the files. Webserver provides `index.html` to clients. Server is launched with `python3 /var/www/html/server.py 192.168.4.1 8765 1 &`

1. If necessary, alter python launch config:

## Update Command Line Args for Server

1. `sudo vim /etc/rc.local`

1. update python line

## Create a raspberry pi image

1. Win32DiskImager

1. Copy

1. Can load this image to sd card in same utility or via raspberry pi imager