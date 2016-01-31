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
Controller.prototype.handleRequest = function (floor) {
    main.elevators[0].assignJob(floor);
}

/* Button class */
var Button = function (buttonType, floorNum) {
    Controller.apply(this); // TODO comment this?
    this.buttonType = buttonType; // up_button, down_button
    this.buttonFloor = floorNum;

    this.buttonId = this.buttonType + '_' + this.buttonFloor;
    this.buttonHtml = 'Floor: ' + this.buttonFloor + ' <a href="#" id="' + this.buttonId + '">' + 
                      buttonType + '</a><br/>';

    $('#floors').append (this.buttonHtml);
    $('#' + this.buttonId).click( this.buttonPressed.bind(this) );
}
Button.prototype = Object.create(Controller.prototype);
Button.prototype.constructor = Button; // TODO comment this?
Button.prototype.buttonPressed = function() {
    this.handleRequest(this.buttonFloor);
}
Button.prototype.getHtml = function () {
    return this.buttonHtml;
}

/* Elevator class */
var Elevator = function (elevatorNum) {
    this.elevatorNum = elevatorNum;
    this.direction = 0; // 0 is idle, 1 is up, -1 is down
    this.idleFloor = 0;
    this.stopLocations = [0];

    this.display();    
}
Elevator.prototype.assignJob = function (floor) {
    this.idleFloor = floor;
    this.stopLocations[0] = floor;
    this.display();
}
Elevator.prototype.display = function () {
    this.html = 'Elevator: ' + this.elevatorNum.toString() + ' ' + 'direction: ' + 
                this.direction + ' ' + 'idle floor: ' + this.idleFloor + '<br/>';
    // init UI
    $('#elevators').append(this.html);
}

/* Floor class */
var Floor = function (floorNum) {
    this.floorNum = floorNum;
    this.upButton = new Button('up_button', floorNum);
    this.downButton = new Button('down_button', floorNum);
}

/* init */
var main = new Controller(3, 2);