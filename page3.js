const carousel = document.querySelector('.carousel');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;
const slides = carousel.children; // Get the children (slides) of the carousel

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

    // If moved enough, shift carousel to next or previous slide
    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex += 1; // Move to next slide
    }
    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1; // Move to previous slide
    }

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
    // Calculate the new position based on the index of the current slide
    currentTranslate = currentIndex * -carousel.clientWidth / slides.length; // Divide by number of slides for equal spacing
    prevTranslate = currentTranslate; // Store the previous position
    carousel.style.transition = 'transform 0.5s ease'; // Add transition for smooth sliding
    carousel.style.transform = `translateX(${currentTranslate}px)`;

    // Reset the transition after the animation is complete
    setTimeout(() => {
        carousel.style.transition = 'none'; // Disable transition for the next drag
    }, 500);
}
