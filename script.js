var text = document.getElementById("output");
document.addEventListener('keydown', function(event) {
    let key = document.getElementById(interpretLetter(event));
    if (key == null)
        return;      
    text.innerText = event.key + "\n" + text.innerText;
    if (key.hasAttribute("lock"))
        return;
    key.toggleAttribute("lock");
    key.toggleAttribute("on");
});

document.addEventListener('keyup', function(event) {
    let key = document.getElementById(interpretLetter(event));
    if (key == null)
        return; 
    text.innerText = event.key + "\n" + text.innerText;
    key.toggleAttribute("lock");
    if (key.getAttribute("type") == "press")
        key.toggleAttribute("on");
});

function interpretLetter(e) {
    switch (e.key) {
        case "ArrowUp":
            return "w";
        case "ArrowLeft":
            return "a";
        case "ArrowDown":
            return "s";
        case "ArrowRight":
            return "d";
    }
    return e.key.toLowerCase();
}