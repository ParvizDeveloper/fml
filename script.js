const container = document.querySelector('.hearts');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (10 + Math.random() * 20) + 'px';

    const duration = 3 + Math.random() * 3;
    heart.style.animationDuration = duration + 's';

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 300);

const btn = document.querySelector('.f2');

let pos = { x: 0, y: 0 };

btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();

    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distX = mouseX - btnX;
    const distY = mouseY - btnY;

    const distance = Math.sqrt(distX ** 2 + distY ** 2);

    if (distance < 150) {
        const force = (150 - distance) / 150;

        const moveX = -distX / distance * 80 * force;
        const moveY = -distY / distance * 80 * force;

        pos.x += moveX;
        pos.y += moveY;

        // 🔥 проверка границ экрана
        const newLeft = rect.left + moveX;
        const newRight = rect.right + moveX;
        const newTop = rect.top + moveY;
        const newBottom = rect.bottom + moveY;

        const padding = 10;

        if (
            newLeft < padding ||
            newRight > window.innerWidth - padding ||
            newTop < padding ||
            newBottom > window.innerHeight - padding
        ) {
            // 💥 возвращаем на место
            pos.x = 0;
            pos.y = 0;
        }

        btn.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
});
const openBtn = document.querySelector('.f');
const modal = document.getElementById('loveModal');
const closeBtn = document.querySelector('.close');

// открыть
openBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

// закрыть
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// клик вне окна
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});