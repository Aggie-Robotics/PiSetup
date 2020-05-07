# Examples/WithMotors

This example shows builds on the echo server from `Examples/SkeletonCode`.

This version adds the ability to control the motors via the Adafruit motor shield. The motor power is specified using sliders. 

To facilitate development, an abstract MotorInterface class is provided. This interface allows the indexing of four motors via the `[]` operator. The power of each motor can be specified via a float in the range `-1` to `1` inclusive, with `0` being the off signal and `None` the brake signal.

A new command line parameter is added, specifying a motor-interface-value. This value, if set to `1`, will use a Adafruit motor interface. Any other value will utilize the virtual motor interface. This is useful for off-pi development.  The syntax is now `server.py <hostname> <port> <motor-interface-value>`.

To transmit the desired motor values to the pi, the following protocol is used:
* The first character shall be `M`
* The second character shall be the motor index as a character, one of `0`,`1`,`2`,`3`
* The remainder of the message shall be either `None` or any string of characters that can be validly converted to a float in the range `-1` to `1`, inclusive.

If any of these rules fail, the message will be treated as an echo message. A validly constructed motor message will not be echoed.

# TODO:
* HTML slider style input
* Test validity of Adafruit code