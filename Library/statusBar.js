const StatusEnum = {
    CONNECTED: 1,
    DISCONNECTED: 2,
};
Object.freeze(StatusEnum)

class StatusBar {
    constructor(element) {
        this.element = element
        this.element.innerHTML = "Status Unknown"
        return this
    }

    setStatus(status) {
        if(status == StatusEnum.CONNECTED) {
            this.element.innerHTML = "Connected";
            this.element.style.background = "green";
        }
        else if(status == StatusEnum.DISCONNECTED) {
            this.element.innerHTML = "Disconnected";
            this.element.style.background = "red";
        }
        else {
            console.log("Unrecognized status: " + status);
        }
    }
}