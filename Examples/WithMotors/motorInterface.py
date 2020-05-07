from abc import ABC, abstractmethod

#abstract class for the interface
class MotorInterface(ABC):
    #constructor
    def __init__(self):
        super().__init__()

    #destructor
    @abstractmethod
    def __del__(self):
        raise NotImplementedError

    #return the value associated with the key
    #i.e. return the throttle of the motor with that index
    @abstractmethod
    def __getitem__(self, key):
        raise NotImplementedError

    #set the value associated with the key
    #i.e. set the value of the throttle for the motor at index i
    #   the throttle value should be in the range [-1,1] inclusive or None
    @abstractmethod
    def __setitem__(self, key, value):
        raise NotImplementedError

    #stop all the motors
    @abstractmethod
    def stop(self):
        pass

    #what is the string representation of the motors
    def __str__(self):
        return "abstract MotorInterface"

class AdaMotorInterface(MotorInterface):
    kit = None #shared across all instances of AdaMotorInterface

    def __init__(self):
        if(kit == None):
            #need to only load and construct if actually using
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