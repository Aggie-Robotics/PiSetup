function initFunction(){
    let j = document.getElementById("joystick")
    let joystick = new Joystick(j)

    let s = document.getElementById("statusBar");
    let statusBar = new StatusBar(s)
    connection = new StatusConnection(myHost, myPort, statusBar);

}