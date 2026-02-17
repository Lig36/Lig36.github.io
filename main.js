// 1. Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    // เพิ่มปุ่ม toggle
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggleBtn);
    
    // สลับโหมด
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if(document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // โหลดโหมดที่เคยเลือก
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        toggleBtn.querySelector('i').className = 'fas fa-sun';
    }
});

// 2. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 3. Back to Top Button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', function() {
    if(window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 4. Counter Animation สำหรับตัวเลข
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 5. Typing Effect
const titles = ['Full Stack Developer', 'UI/UX Designer', 'Freelancer'];
let titleIndex = 0;
let charIndex = 0;
const titleElement = document.querySelector('.title');

function typeTitle() {
    if(charIndex < titles[titleIndex].length) {
        titleElement.textContent += titles[titleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeTitle, 100);
    } else {
        setTimeout(eraseTitle, 2000);
    }
}

function eraseTitle() {
    if(charIndex > 0) {
        titleElement.textContent = titles[titleIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(eraseTitle, 50);
    } else {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeTitle, 500);
    }
}

// เริ่ม Typing Effect
setTimeout(typeTitle, 1000);

// 6. Progress Bar Animation
function animateProgressBars() {
    document.querySelectorAll('.skill-progress-bar').forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });
}

// 7. Form Validation (ถ้ามีฟอร์มติดต่อ)
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if(name.length < 2) {
        alert('กรุณากรอกชื่อ');
        return false;
    }
    
    if(!email.includes('@') || !email.includes('.')) {
        alert('กรุณากรอกอีเมลให้ถูกต้อง');
        return false;
    }
    
    if(message.length < 10) {
        alert('กรุณากรอกข้อความอย่างน้อย 10 ตัวอักษร');
        return false;
    }
    
    return true;
}

// 8. Lazy Loading รูปภาพ
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                imageObserver.unobserve(image);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 9. Loader Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if(loader) {
        loader.style.display = 'none';
    }
});

// 10. Copy Email Function
function copyEmail() {
    const email = 'Phutanetliang@email.com';
    navigator.clipboard.writeText(email).then(() => {
        alert('คัดลอกอีเมลแล้ว!');
    });
}