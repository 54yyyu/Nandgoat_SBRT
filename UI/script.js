var buttons = document.querySelectorAll(".tap");
var joysticks = document.getElementsByClassName("joystick");
var input = [0,0,0,0,0,0];

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mousedown", function(e) {
        this.toggleAttribute("on");
        if (this.hasAttribute("on")) {
            input[parseInt(this.getAttribute("out"))] = 1;
        }
        else {
            input[parseInt(this.getAttribute("out"))] = 0;
        }
        inputToString();
    });
}

function joystickOut(val, o) {
    input[o] = val;
    console.log(input);
    let str = "";
    for (let i = 0; i < input.length; i++) {
        str += str + " ";
    }
    inputToString();
}

function inputToString() {
    let o = input.join(" ");
    console.log(o);
    // sendToBot(o);
}