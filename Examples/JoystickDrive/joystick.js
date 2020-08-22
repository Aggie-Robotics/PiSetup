//this file manages the behavior of the joystick

//these cache the search result for minor performance improvement
joystickElement = null;
joystickDraw = null;

//the max linear movement of the joystick
joystickMaxMovement = null; 

//the xy of the touch start
joystickTouchStart = null;

//the touchpoint object
//we store this because it is possible to have multiple touch points
//  on a single collider (the joy stick)
//  we decided that only one touch per joystick should be allowed
//  but there is no reason you need to consider only one
joystickTouchIdentifier = null;


function initializeJoystick(){
    joystickElement = document.getElementById("joystickCollider");
    joystickDraw = document.getElementById("joystick");
    console.log("Joystick setup complete.:" + joystickElement);

    joystickElement.addEventListener('touchstart', jsTouchStart, false);
    joystickElement.addEventListener('touchend', jsTouchEnd, false);
}

//called when a new touch point is established
function jsTouchStart(ev){
    
    ev.preventDefault(); //now mouse click events will not be created
    //see https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent

    // console.log("Clicked via touch point.");

    //targetTouches - the touch points that are targeting this object
    if(ev.targetTouches.length != 0 && joystickTouchIdentifier == null){

        //assign the first targeting touch point as the value
        myTouch = ev.targetTouches[0];
        //joystickTouchObject = myTouch;
        joystickTouchIdentifier = myTouch.identifier;
        joystickTouchStart = [myTouch.clientX, myTouch.clientY];

        //register the callback for every time the touchpoint moves
        joystickElement.addEventListener('touchmove', jsTouchMove, false);
        
        //console.log(joystickTouchStart); //print the touch start position

        //need to log the range of motion (how much can the joystick move?):
        //the max movement has the joystick tangent to the top of the joystick box
        //just assuming that the items are both squares
        p = joystickElement.parentElement.clientHeight;
        j = joystickElement.clientHeight;

        joystickMaxMovement = (.5*(p-j));
        //note the max movement will be wrong if the window is resized mid touch
        // but that will never happen...right?
    }
}

//called when ANY touch point is updated
//as such, it is registered when a relevant touch is started
//and unregistered when it ends
function jsTouchMove(ev){
    myTouch = null;
    for(i = 0; i < ev.targetTouches.length; i++)
    {
        if(ev.targetTouches[i].identifier == joystickTouchIdentifier)
        {
            myTouch = ev.targetTouches[i];
            break;
        }
    }
    
    if(myTouch == null)
    {
        //the master touch could not be found,
        //which should not be possible since the event is unregistered once 
        //  the primary touch ends
        return;
    }

    //now get the current position
    myPos = [myTouch.clientX, myTouch.clientY];
    myVector = [(myPos[0]-joystickTouchStart[0])/joystickMaxMovement, 
                (myPos[1]-joystickTouchStart[1])/joystickMaxMovement];
    //note how you can still get full 1 movement regardless of where in the collider you first start the touch

    //In here you could add some behavior code:
    //  snap to 5deg intervals, create a dead zone, ect

    //now we unitize the vector
    vectorMagnitude = Math.sqrt(Math.pow(myVector[0],2)+Math.pow(myVector[1], 2));
    if (vectorMagnitude > 1) {
        //unitize the vector so that the transform cannot be out of bounds
        myVector[0] = myVector[0] / vectorMagnitude;
        myVector[1] = myVector[1] / vectorMagnitude;
    }
    joystickDraw.style.left = String(myVector[0]*joystickMaxMovement);
    joystickDraw.style.top = String(myVector[1]*joystickMaxMovement);

    //console.log(myVector);

    updateJoystickPosition(myVector[0], myVector[1])
}

//called when a touch point is removed
function jsTouchEnd(ev){
    ev.preventDefault(); //prevent mouse clicks

    //we need to check two conditions, 
    //  first, that the touch point we care about (joystickTouchIdentifier)
    //      is no longer in the target set (its not targeting anymore)

    //basically, this comes down to the possible multi-touch on one joystick
    //  in such cases, the first touch is the master and all others are to be ignored

    if(joystickTouchIdentifier == null)
    {
        //there is no relevant touch, do nothing
        return;
    }

    for(i =0; i < ev.targetTouches.length; i++)
    {
        if(ev.targetTouches[i].identifier == joystickTouchIdentifier)
        {
            //the touch point we decided was master still exists
            //so do nothing
            return;
        }
    }

    //find the ending point
    //this requires scanning the altered list for the touch object

    //can the master touch be changed and a false touch removed in the same event?
    //  if not- the prior loop is not necessary

    myTouch = null;

    for(i =0; i < ev.changedTouches.length; i++)
    {
        if(ev.changedTouches[i].identifier == joystickTouchIdentifier)
        {
            myTouch = ev.changedTouches[i];
            break;
        }
    }

    //check error conditions
    if(myTouch == null)
    {
        console.log("On release, could not find matching touch identifier.");
        //reset the object so that error is 'fixed'
        resetJoystick();
        return;
    }

    endPosition = [myTouch.clientX, myTouch.clientY];
    console.log(joystickTouchIdentifier+":"+joystickTouchStart + "->" + endPosition);

    //reset and prepare for next input
    resetJoystick();

    // console.log("Released via touch point.");
    // console.log(ev);
}

//perform any reset logic
function resetJoystick(){
    //fix the js side
    joystickTouchIdentifier = null;
    joystickTouchStart = null;
    joystickMaxMovement = null;

    //may cause a problem for IE8 and earlier
    joystickElement.removeEventListener("touchmove", jsTouchMove);

    updateJoystickPosition(0,0);
}

//redraw the joystick and update the robot
function updateJoystickPosition(x, y)
{
    joystickDraw.style.left = String(x*joystickMaxMovement);
    joystickDraw.style.top = String(y*joystickMaxMovement);

    msg = "JSPos " + x + " " + y;
    // console.log(msg); //very spammy

    send(msg);
}
