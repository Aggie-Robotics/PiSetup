class StatusConnection extends ConnectionBase {
    
    constructor(host, port, statusObj) {
        super(host, port);
        this.statusObj = statusObj;

        this.onSocketOpen = function(event){
            console.log("Socket Opened");
            statusObj.setStatus(StatusEnum.CONNECTED);
        }

        this.onSocketClose = function(event){
            console.log("Socket Closed");
            statusObj.setStatus(StatusEnum.DISCONNECTED);
        }

        this.connect()
    }

}