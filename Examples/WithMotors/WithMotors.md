# Examples/WithMotors

This example shows builds on the echo server from `Examples/SkeletonCode`.

This version adds the ability to control the motors via the Adafruit motor shield. The motor power is specified using sliders. 

### PyServer

To facilitate development, an abstract MotorInterface class is provided. This interface allows the indexing of four motors via the `[]` operator. The power of each motor can be specified via a float in the range `-1` to `1` inclusive, with `0` being the off signal and `None` the brake signal.

A new command line parameter is added, specifying a motor-interface-value. This value, if set to `1`, will use a Adafruit motor interface. Any other value will utilize the virtual motor interface. This is useful for off-pi development.  The syntax is now `server.py <hostname> <port> <motor-interface-value>`.

To transmit the desired motor values to the pi, the following protocol is used:
* The first character shall be `M`
* The second character shall be the motor index as a character, one of `0`,`1`,`2`,`3`
* The remainder of the message shall be either `None` or any string of characters that can be validly converted to a float in the range `-1` to `1`, inclusive.

If any of these rules fail, the message will be treated as an echo message. A validly constructed motor message will not be echoed.

### HTML and Sliders

Slider inputs are a (relatively) standard input method for browsers. However, the appearance is not. In the HTML, we make the four sliders fill the horizontal space of the screen (explained later). Touching anywhere on the screen will adjust the closest slider. In the case that you want to change the appearance of the slider: [this tutorial](https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/) is an excellent starting point.

Sliders are intended to only be displayed horizontally. However, through the magic of CSS we can spin them to be vertical. However, this poses a slight problem as the rotation happens around the center of the slider element. Additionally, the `height` and `width` of the slider are the dimensions when it is horizontal, before the rotation is applied. This means that the "width" of the vertical slider is set by its `height` field, and vice versa.

At the same time, since the slider is rotated in place, it can overlap with the elements above and below it on the page. This can be fixed by manually overriding the position of the element. To accomplish this, the parent element, in this case a `div` is given a fixed height `50vh` or 50% of the page's height. Assuming we want the sliders to fill this height, we set their width to `50vh` as well. For height, the parent element spans the page so `100vw` will work. If we want four slider to fill this, their height needs to be set to `25vw`, 25% of the view width. Now when the rotation is applied, the elements are rotated about their center: horizontally (width) `25vh` to the right and vertically (height) `12.5vw` down as measured from the upper left of the `div`. Then, using `position: absolute;`, the elements are moved to their proper place. Vertically, this is `-12.5vw` (to put the center even with the top of the `div`) and `+25vh` (or half of the height of the `div`). Horizontally, the math is `-25vh` to align with the left edge of the parent `div` plus enough offset, in `vh` to position the sliders horizontally. Since the position is the center of the slider, these values are `12.5vw`, `37.5vw`, `62.5vw`, `87.5vw`.

As an added bonus, since this is all done as percentage of window size, it should work on any browser.