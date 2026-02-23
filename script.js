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
