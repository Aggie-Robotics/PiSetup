from abstractMotorInterface import MotorInterface

# interface for the adafruit motor library via motor interface
class AdaMotorInterface(MotorInterface):
    kit = None #shared across all instances of AdaMotorInterface

    def __init__(self):
        try:
            kit == None
        except UnboundLocalError:
            #do not load the interface until needed
            from adafruit_motorkit import MotorKit
            kit = MotorKit()

        self.motors = [kit.motor1, kit.motor2, kit.motor3, kit.motor4]
        self.stop()

    def __del__(self):
        self.stop()

    def __getitem__(self, key):
        return self.motors[key].throttle

    def __setitem__(self, key, value):
        if(value != None and (value < -1 or value > 1)):
            raise ValueError(f"Illegal throttle Value. Should be float in inclusive range [-1,1] got {value}")
        self.motors[key].throttle = value
    
    def stop(self):
        #stop all the motors
        for i in range(len(self.motors)):
            self.motors[i].throttle = None

    def __str__(self):
        s = "["
        for i in range(len(self.motors)):
            try:
                t = self.motors[i].throttle
                if(t > 0):
                    s += f" {t:4.2f}" #4.2f formats how the number is printed
                elif(t < 0):
                    s += f"{t:4.2f}"
                else:
                    s += "    0"
            except TypeError:
                s += " None"
            if(i != len(self.motors)-1):
                s += ","
        return s + "]"