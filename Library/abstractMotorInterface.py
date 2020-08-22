from abc import ABC, abstractmethod

#abstract class for a motor interface
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



