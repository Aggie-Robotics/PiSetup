from abstractMotorInterface import MotorInterface

#interface for a virtual motor for debugging when motors are not available
class VirtualMotorInterface(MotorInterface):
    def __init__(self):
        self.motors = [None]*4
        self.stop() #not technically necessary 

    def __del__(self):
        self.stop()

    def __getitem__(self, key):
        return self.motors[key]

    def __setitem__(self, key, value):
        if(value != None and (value < -1 or value > 1)):
            raise ValueError(f"Illegal throttle Value. Should be float in inclusive range [-1,1] got {value}")
        self.motors[key] = value
        print(self)
    
    def stop(self):
        #stop all the motors
        for i in range(len(self.motors)):
            self.motors[i] = None

    def __str__(self):
        s = "["
        for i in range(len(self.motors)):
            try:
                t = self.motors[i]
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