# Library

This folder contains sample/started code to assist with the development of your system. Download scripts are provided for grouped components.

# Scripts

Use the scripts to collect code by:

1. Navigate to folder
1. (Optional) empty the folder `rm -rf *`
    1. WARNING: this will delete everything
1. Download the script: `wget https://raw.githubusercontent.com/Aggie-Robotics/PiSetup/master/Examples/WithMotors/<scriptName>.sh`
1. Allow the script permission to run: `chmod u+r+x <scriptName>.sh`

1. Run the script: `./<scriptName>.sh`

## Single Joystick 

Name: `singleJoy.sh`

A simple controller with a single joystick. Script contains a full python, javascript, and html (index.html) ready to deploy. Also implements the virtual motor interface.