const carousel = document.querySelector('.carousel');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

// Prevent context menu on long press
carousel.addEventListener('contextmenu', (e) => e.preventDefault());

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('touchstart', startDrag);

carousel.addEventListener('mousemove', drag);
carousel.addEventListener('touchmove', drag);

carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('touchend', endDrag);
carousel.addEventListener('mouseleave', endDrag);

function startDrag(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
}

function drag(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function endDrag() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    // Update index based on drag amount
    if (movedBy < -100 && currentIndex < carousel.childElementCount - 3) currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -carousel.clientWidth / 4; // Adjust based on item width
    prevTranslate = currentTranslate;
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

// Initialize position
setPositionByIndex();
