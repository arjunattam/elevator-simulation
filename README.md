# elevator-simulation

# Problem statement
Simplified elevator simulation to implement abstract method in object oriented design.

# Solution
## Summary
The solution has been deployed on Github pages, [link](http://arjun27.github.io/elevator-simulation/). Javascript prototypes have been used to define classes, their properties and methods.

The implementation is restricted to floor buttons only, and jobs are given to idle elevators only.

## OOP design
* __Controller__

  This is the main controller/logic class, responsible for defining _n floors_ and _m elevators_. The Controller class also defines an abstract method _buttonPressed_ which is defined later in the Button class. Job requests are handled with the _handleRequest_ method.
* __Button__

  This class defines a floor button, which inherits from the Controller class and defines the _buttonPressed_ capability of the abstract method.
* __Floor__

  This class defines a floor, with characteristics of having 2 buttons (_upButton_ and _downButton_) and an identifier number, _floorNum_.
* __Elevator__

  This class defines an elevator, with characteristics of current _idleFloor_ and movement of _direction_, which are typically displayed on the elevator status screens. In addition, there is an identifier number, _elevatorNum_.

  The _isEligible_ method checks whether the elevator is fit to take up a job, while the _assignJob_ method takes a job and moves the elevator accordingly.