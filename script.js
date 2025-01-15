const carousel = document.querySelector('.carousel')
let items = Array.from(document.querySelectorAll('.item'))
let startY;
let isDragging = false
//update class for items to set position
const updateClass = ()=>{
    items.forEach((item,index)=>{
        item.className='item';
        if(index===0) item.classList.add('top');
        if(index===1) item.classList.add('middle');
        if(index===2) item.classList.add('bottom');
    });
}
// Find middle item and only drag it
carousel.addEventListener('dragstart',(e)=>{
    const middleItem = items.find(item => item.classList.contains('middle')); 
    if (e.target !== middleItem) return; 

    isDragging = true; 
    startY = e.clientY; 
    e.dataTransfer.setDragImage(new Image(), 0, 0); // Hides the default drag image
});
// Event listener for dragging
carousel.addEventListener('drag', (e) => {
    if (!isDragging || e.clientY === 0) return; // Exit if not dragging 
    const offset = e.clientY - startY; //to calculate up or down motion
    const middleItem = items.find(item => item.classList.contains('middle'));
    const topItem = items.find(item => item.classList.contains('top'));
    const bottomItem = items.find(item => item.classList.contains('bottom'));

    // Update size and opacity of middle item
    middleItem.style.transform = `translateY(${100 - offset}px) scale(1.2)`;

    // Update size and opacity of top item
    topItem.style.transform = `translateY(${-20 - offset * 0.5}px) scale(${1 + offset / 500})`;
    topItem.style.opacity = `${0.4 + Math.abs(offset) / 400}`;

    // Update size and opacity of bottom item
    bottomItem.style.transform = `translateY(${220 - offset * 0.5}px) scale(${1 - offset / 500})`;
    bottomItem.style.opacity = `${0.4 - Math.abs(offset) / 400}`;
});
// Event listener for end of drag
carousel.addEventListener('dragend', (e) => {
    if (!isDragging) return; // Exit if not dragging
    isDragging = false; // Reset dragging state
    const offset = e.clientY - startY; //To calculate up or down motion
    if (offset < -50) {
        animateDown(); // Moves middle down
    } else if (offset > 50) {
        animateUp(); // Moves middle up
    } else {
        resetPosition(); // Resets items 
    }
});

function animateUp() {
    items.unshift(items.pop()); // Move last item to first
    updateClass(); 
    resetPosition(); 
}

// Moves the middle item down and updates classes
function animateDown() {
    items.push(items.shift()); // Moves the first item to last
    updateClass(); 
    resetPosition(); 
}

// Resets the transform and opacity of all items
function resetPosition() {
    items.forEach(item => {
        item.style.transform = ''; 
        item.style.opacity = ''; 
    });
}

updateClass(); // Initialize the carousel item classes 