var text = document.getElementById("output");
var allKeys = document.querySelectorAll("#tapButtons > *, .wasdLayout button");

var joysticks = document.getElementsByClassName("joystick");
var keys = document.getElementsByClassName("wasdLayout");

switchKeys(false);

for (let i = 0; i < allKeys.length; i++) {
    let key = allKeys[i];
    key.addEventListener("mousedown", function(event) {
        enter(event, key);
    });
    key.addEventListener("mouseup", function(event) {
        exit(event, key);
    });
    key.addEventListener("touchstart", function(event) {
        enter(event, key);
    });
    key.addEventListener("touchend", function(event) {
        exit(event, key);
    });
    console.log(key.innerText);
}

document.addEventListener('keydown', function(event) {
    enter(event, null);
});
document.addEventListener('keyup', function(event) {
    exit(event, null);
});

function interpretLetter(e) {
    return e.key.toLowerCase();
}

function enter(e, key) {
    if (key == null)
        key = document.getElementById(interpretLetter(e));
    if (key == null)
        return;      
    text.innerText = e.key + "\n" + text.innerText;
    if (key.hasAttribute("lock"))
        return;
    key.toggleAttribute("lock");
    key.toggleAttribute("on");
}

function exit(e, key) {
    if (key == null)
        key = document.getElementById(interpretLetter(e));
    if (key == null)
        return; 
    text.innerText = e.key + "\n" + text.innerText;
    key.toggleAttribute("lock");
    if (key.getAttribute("type") == "press")
        key.toggleAttribute("on");
}

function switchKeys(isKeyboard) {
    if (isKeyboard)
    {
        for (let i = 0; i < joysticks.length; i++) {
            joysticks[i].style.display = "none";
            keys[i].style.display = "block";
        }
    }
    else {
        for (let i = 0; i < joysticks.length; i++) {
            joysticks[i].style.display = "block";
            keys[i].style.display = "none";
        }
    }
}
