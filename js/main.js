// Move Card On Hover
VanillaTilt.init(document.querySelector(".card"), {
    max: 25,
    speed: 400
});
const bgMain = document.querySelector(".background-main")
const bgGame = document.querySelector(".background-game")
const bgPanel = document.querySelector(".background-panel")
const videoBg = document.querySelector(".background-video");
const audio = document.querySelector("audio");
const btnSlow = document.querySelector(".btn-slow")
const btnFast = document.querySelector(".btn-fast")
const btnMusic = document.querySelector(".btn-music")
const btnControl = document.querySelector(".btn .fas")
const playNowButton = document.querySelector(".card-play")
const bgButton = document.querySelector(".background-button")
const draggableElement1 = document.querySelector("#myDraggableElement1")
const draggableElement2 = document.querySelector("#myDraggableElement2")
const draggableElement3 = document.querySelector("#myDraggableElement3")
const draggableElement4 = document.querySelector("#myDraggableElement4")
const itemPlaceOne = document.querySelector(".item-place.one")
const itemPlaceTwo = document.querySelector(".item-place.two")
const itemPlaceThree = document.querySelector(".item-place.three")
const itemPlaceFour = document.querySelector(".item-place.four")
const videoPuzzle = document.querySelector(".video-puzzle")
const videoKeys = document.querySelector(".video-keys")
const panelElements = document.querySelector(".panel-elements")
const keyUp = document.querySelector(".fa-arrow-circle-up");
const keyDown = document.querySelector(".fa-arrow-circle-down");
const keyLeft = document.querySelector(".fa-arrow-circle-left");
const keyRight = document.querySelector(".fa-arrow-circle-right");
const keyR = document.querySelector(".fa-registered");

// Slow Video On Click / First Page
btnSlow.addEventListener("click", () => {
    videoBg.playbackRate = 0.5;
    // video.pause();
})
// Fast Video On Click / First Page
btnFast.addEventListener("click", () => {
    videoBg.playbackRate = 1;
    // video.currentTime += 0.03 - KLATKOWANIE
})
// Play and Stop Music / First Page
btnMusic.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        btnControl.classList.remove("fa-play")
        btnControl.classList.add("fa-pause")
    } else if (audio.played) {
        audio.pause();
        btnControl.classList.remove("fa-pause")
        btnControl.classList.add("fa-play")
    }
})
// Play Video / First Page
videoBg.play();

//Change Main Page/Show First Panel Game/Show Second Panel Game
[playNowButton, bgButton].forEach(button => {
    button.addEventListener("click", () => {

        if (videoBg.classList.contains("active") && bgGame.classList.contains("active")) {
            bgPanel.classList.remove("active")
            videoBg.classList.remove("active")
            bgGame.classList.remove("active")
            playNowButton.textContent = "Play now"
        } else if (videoBg.classList.contains("active")) {
            bgGame.classList.add("active")
            playNowButton.textContent = "Return"
        } else if (!videoBg.classList.contains("active")) {
            bgPanel.classList.add("active")
            videoBg.classList.add("active")
            playNowButton.textContent = "Play next"

        }

    })
})

// Puzzle Game (drag and drop motion) / First Game
draggableElement1.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggableElement1.id)
})
draggableElement2.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggableElement2.id)
})
draggableElement3.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggableElement3.id)
})
draggableElement4.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggableElement4.id)
})

for (const dropZone of document.querySelectorAll(".drop-zone")) {
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        const droppedElementId = e.dataTransfer.getData("text/plain")
        const droppedElement = document.getElementById(droppedElementId)

        dropZone.appendChild(droppedElement)
        //Check function if all elements are on good position 
        checkPuzzle()
    })
}

// Check Puzzle Game / First Game
function checkPuzzle() {
    const match1 = new RegExp("myDraggableElement1").test(itemPlaceOne.innerHTML)
    const match2 = new RegExp("myDraggableElement4").test(itemPlaceTwo.innerHTML)
    const match3 = new RegExp("myDraggableElement2").test(itemPlaceThree.innerHTML)
    const match4 = new RegExp("myDraggableElement3").test(itemPlaceFour.innerHTML)
    if (match1 && match2 && match3 && match4) {
        // Start Video Game One
        setTimeout(videoPuzzle.play(), 1500);
        // Set Opacity
        [itemPlaceOne, itemPlaceTwo, itemPlaceThree, itemPlaceFour].forEach(item => {
            item.classList.add("active")
        })
    }
}

//Check Keyboards Keys / Second Game
function gameOn(e) {
    let btn = e.keyCode;
    if (btn === 38) {
        keyUp.classList.add("color");
    } else if (btn === 39) {
        keyRight.classList.add("color");
    } else if (btn === 40) {
        keyDown.classList.add("color");
    } else if (btn === 37) {
        keyLeft.classList.add("color");
    } else if (btn === 82) {
        keyR.classList.add("color");
    } else {
        removeArrows();
    }
    checkArrows()
    if (checkArrows) {
        return
    }
}

// Delete Class Color On Bad Key / Second Game
function removeArrows() {
    for (const keys of [keyDown, keyLeft, keyUp, keyRight, keyR])
        keys.classList.remove("color");
}

//Start Video On Good Keys  / Second Game
function checkArrows() {
    const up = keyUp.classList.contains("color");
    const down = keyDown.classList.contains("color");
    const right = keyRight.classList.contains("color");
    const left = keyLeft.classList.contains("color");
    const R = keyR.classList.contains("color");

    if (up && down && left && right && R) {
        videoKeys.play()
        for (const keys of [keyDown, keyLeft, keyUp, keyRight, keyR]) {
            keys.classList.add("color-stay");
        }
    };
}

document.addEventListener("keyup", gameOn)