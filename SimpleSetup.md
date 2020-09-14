1. Install Debian Lite
        
    * Raspberry Pi Imager
        
    * Under Other

    * Write to SD card

1. Connect to External Monitor

    * Default User/Password: pi/raspberry

1. `sudo raspi-config`

    * Enable ssh

    * Enable i2c

    * Both under interfacing options

1. (Logging in from ssh will allow you to copy-paste command)

1. `sudo apt-get install vim`

    *  VIM tutorial

    * "<link something here>"

    * Can also use nano/emacs if you prefer

1. change keyboard
        
    * `sudo vim /etc/default/keyboard`

    * `XKBLAYOUT="us"`

1. Configure wifi as access point

    * `sudo apt install dnsmasq hostapd`

    * `sudo systemctl stop dnsmasq`

    * `sudo systemctl stop hostapd`

1. Configure DHCP (turing the pi into a router)

    * `sudo vim /etc/dhcpcd.conf`

    * Append (indentation 4 spaces important):

    ```
    interface wlan0
        static ip_address=192.168.4.1/24
        nohook wpa_supplicant
    ```

    * Restart the service: `sudo service dhcpcd restart`
    
    * `sudo vim /etc/dnsmasq.conf`

    * Append:

    ```
    interface=wlan0
    dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
    ```

    * Restart the service: `sudo systemctl start dnsmasq`

1. Configure HPD (turing the pi into an access point)

    * Create config: `sudo vim /etc/hostapd/hostapd.conf`

    * add fields:

    ```
    interface=wlan0
    driver=nl80211
    ssid=Sumobot
    hw_mode=g
    channel=7
    wmm_enabled=0
    macaddr_acl=0
    auth_algs=1
    ignore_broadcast_ssid=0
    wpa=2
    wpa_passphrase=AggieRobotics
    wpa_key_mgmt=WPA-PSK
    wpa_pairwise=TKIP
    rsn_pairwise=CCMP
    ```
    
    * ssid is network name

    * wpa_passphrase is network password

    * update ref to config file: `sudo vim /etc/default/hostapd`

    * change line `#DAEMON_CONF` to `DAEMON_CONF="/etc/hostapd/hostapd.conf"`

    * run three commands

    ```
    sudo systemctl unmask hostapd
    sudo systemctl enable hostapd
    sudo systemctl start hostapd
    ```

    * reboot and verify network is visible

1. Configure IP Tables (IP Routing)

    * Setup all incoming connections to redirect locally

    ```
    sudo iptables -t nat -A PREROUTING -p tcp -j DNAT –-to-destination 192.168.4.1
    sudo iptables -A FORWARD -d 192.168.4.1/32 -p TCP -j ACCEPT
    ```

    * Save the configuration

    `sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"`

    * Make this config auto load, edit `sudo vim /etc/rc.local`

    * append before the exit

    `iptables-restore < /etc/iptables.ipv4.nat`

1. Install Apache (Webserver Client)

    * `sudo apt-get install apache2`

    * webpage at `/var/www/html/index.html` is served when connecting

    * Apache automatically runs at startup

1. Installing Python and libraries

    * `sudo apt-get install python3`

    * `sudo apt-get install python3-pip`

    * `sudo` is important because we need to install under the root account as that is where `rc.local` runs

    * `sudo pip3 install websockets`

    * `sudo pip3 install adafruit-circuitpython-motorkit`

    * It is not a bad idea to install them under non-root (no `sudo`) as well

1. Making the python server run on startup

    * `sudo vim /etc/rc.local`

    * Add before the exit line: 
    
    `sudo cd /var/www/html && sudo python3 server.py 192.168.4.1 8765 1 &`

1. Edit the root account password

    * `sudo passwd root`

1. Give PI user access to the `/var/ww/html` folder

    * `sudo chmod -R 777 /var/www/html`

* `sudo reboot` and everything should work