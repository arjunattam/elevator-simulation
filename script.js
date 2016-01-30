/* Button class */
var Button = function (buttonType, floorNum) {
    this.buttonType = buttonType; // up_button, down_button
    this.buttonFloor = floorNum;

    this.buttonId = this.buttonType + '_' + this.buttonFloor;
    this.buttonHtml = 'Floor: ' + this.buttonFloor + ' <a href="#" id="' + this.buttonId + '">' + 
                        buttonType + '</a><br/>';

    $('#floors').append (this.buttonHtml);
    $('#' + this.buttonId).click( this.clickMethod );
}
Button.prototype.getHtml = function () {
    return this.buttonHtml;
}
Button.prototype.clickMethod = function () {
    console.log (this);
    main.buttonPressed(1); // TODO: fix this by abstract?
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
    console.log('assign job called');
    this.idleFloor = floor;
    this.stopLocations[0] = floor;
    this.display();
}
Elevator.prototype.display = function () {
    console.log('elev display called');
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
Controller.prototype.buttonPressed = function (floor) {
    console.log ('calling button pressed', this);
    this.elevators[0].assignJob(floor);
}

/* init */
var main = new Controller(3, 2);