/* Controller class */
var Controller = function (n, m) {
    this.floors = []; // array of n floors
    this.elevators = []; // array of m elevators
    this.name = 'controller';
    this.requests = []

    var i;
    for (i = 0; i < n; i++) {
        this.floors.push (new Floor(i));
    }
    for (i = 0; i < m; i++) {
        this.elevators.push (new Elevator(i));
    }
}
Controller.prototype.buttonPressed = function() {
    throw new Error('Abstract method');
}
Controller.prototype.handleRequest = function (direction, floor) {
    // TODO which elevator to assign job
    // find an elevator moving in that direction, if not, then find idle
    // in moving elevator, check if floor < stopLocations[0] (for up)

    // TODO disable (down, 0) and (up, last floor)
    var i, minIndex = -1, minDistance = Infinity;
    for (i = 0; i < main.elevators.length; i++) {
        var distanceIndex = main.elevators[i].isEligible (direction, floor);
        if (distanceIndex > 0 && distanceIndex < minDistance) {
            minIndex = i; minDistance = distanceIndex;
        }
    }
    if (minIndex != -1) {
        main.elevators[minIndex].assignJob(direction, floor);
    } else {
        alert('no eligible elevators');
        // TODO request queue
    }
}

/* Button class */
var Button = function (buttonType, floorNum) {
    Controller.apply(this); // TODO comment this?
    this.buttonType = buttonType; // 1 is up, -1 is down
    this.buttonFloor = floorNum;
    this.buttonTypeString = (this.buttonType == 1) ? 'up_button' : 'down_button';

    this.buttonId = this.buttonTypeString + '_' + this.buttonFloor;
    this.buttonHtml = 'Floor: ' + this.buttonFloor + ' <a href="#" id="' + this.buttonId + '">' + 
                      this.buttonTypeString + '</a><br/>';

    $('#floors').append (this.buttonHtml);
    $('#' + this.buttonId).click( this.buttonPressed.bind(this) );
}
Button.prototype = Object.create(Controller.prototype);
Button.prototype.constructor = Button; // TODO comment this?
Button.prototype.buttonPressed = function() {
    console.log('button pressed from button');
    this.handleRequest(this.buttonType, this.buttonFloor);
}
Button.prototype.getHtml = function () {
    return this.buttonHtml;
}

/* Elevator class */
var Elevator = function (elevatorNum) {
    this.elevatorNum = elevatorNum;
    this.direction = 0; // 0 is idle, 1 is up, -1 is down
    this.idleFloor = 0;
    this.stopLocations = [];

    this.display();    
}
Elevator.prototype.display = function () {
    this.html = 'Elevator: ' + this.elevatorNum.toString() + ' ' + 'direction: ' + 
                this.direction + ' ' + 'idle floor: ' + this.idleFloor + '<br/>';
    // init UI
    $('#elevators').append(this.html);
}
Elevator.prototype.assignJob = function (direction, floor) {
    this.direction = direction;
    this.display();
    setTimeout( function() { 
        this.idleFloor = floor; 
        this.direction = 0; 
        this.display(); 
    }.bind(this), 2000 );
    // TODO logic for moving elevator
}
Elevator.prototype.isEligible = function (direction, floor) {
    if (this.direction == 0) {
        // eligible, and return distance
        return Math.abs(floor - this.idleFloor);
    } else {
        return -1;
    }
    // TODO for moving elevator
}

/* Floor class */
var Floor = function (floorNum) {
    this.floorNum = floorNum;
    this.upButton = new Button(1, floorNum);
    this.downButton = new Button(-1, floorNum);
}

/* init */
var main = new Controller(3, 2);