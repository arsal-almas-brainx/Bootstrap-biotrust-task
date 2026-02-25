//image scrolling section 1 left
const track = document.getElementById('track');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');

let currentIdx = 0;
const total = track.children.length;
const visible = 5;
const step = 110; // Image height (100) + Gap (10)

function scroll() {
    track.style.transform = `translateY(-${currentIdx * step}px)`;
    upBtn.disabled = (currentIdx === 0);
    downBtn.disabled = (currentIdx >= total - visible);
}

upBtn.addEventListener('click', () => {
    if (currentIdx > 0) {
        currentIdx--;
        scroll();
    }
});

downBtn.addEventListener('click', () => {
    if (currentIdx < total - visible) {
        currentIdx++;
        scroll();
    }
});
//button switching section 1 right
function switchContent(type) {
    document.querySelectorAll('.purchase-content').forEach(div => {
        div.classList.add('d-none');
    });
    const targetId = 'content-' + type;
    document.getElementById(targetId).classList.remove('d-none');
}
//image scrolling section 1 right footer
(function() {
    const hViewport = document.getElementById('viewport');
    const hTrack = document.getElementById('h-track');

    if (!hViewport || !hTrack) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    const items = [...hTrack.children];
    const originalCount = items.length;
    items.forEach(item => {
        hTrack.appendChild(item.cloneNode(true));
        hTrack.insertBefore(item.cloneNode(true), hTrack.firstChild);
    });
    const setInitialPos = () => {
        const itemWidth = hTrack.children[0].offsetWidth;
        hViewport.scrollLeft = itemWidth * originalCount;
    };
    window.addEventListener('load', setInitialPos);
    window.addEventListener('resize', setInitialPos);
    hViewport.addEventListener('mousedown', (e) => {
        isDown = true;
        hViewport.style.cursor = 'grabbing';
        startX = e.pageX - hViewport.offsetLeft;
        scrollLeft = hViewport.scrollLeft;
    });
    window.addEventListener('mouseup', () => {
        isDown = false;
        hViewport.style.cursor = 'grab';
    });
    hViewport.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - hViewport.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag speed multiplier
        hViewport.scrollLeft = scrollLeft - walk;

        handleLoop();
    });
    function handleLoop() {
        const itemWidth = hTrack.children[0].offsetWidth;
        const totalSetWidth = itemWidth * originalCount;
        if (hViewport.scrollLeft >= totalSetWidth * 2) {
            hViewport.scrollLeft -= totalSetWidth;
        } 
        else if (hViewport.scrollLeft <= 0) {
            hViewport.scrollLeft += totalSetWidth;
        }
    }
})();
//zoom effect of section 1 + image select
const mainImg = document.getElementById('main-product-img');
const zoomBox = document.getElementById('zoom-box');
const thumbnails = document.querySelectorAll('.v-item');

if(thumbnails.length > 0) thumbnails[0].classList.add('active-thumb');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
        
        mainImg.src = this.src;

        
        thumbnails.forEach(t => t.classList.remove('active-thumb'));
        this.classList.add('active-thumb');
    });
});

// Zoom Follow Logic
zoomBox.addEventListener('mousemove', (e) => {
    const rect = zoomBox.getBoundingClientRect();
    
   
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    
    mainImg.style.transformOrigin = `${x}% ${y}%`;
});


zoomBox.addEventListener('mouseleave', () => {
    mainImg.style.transformOrigin = 'center center';
});