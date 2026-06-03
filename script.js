document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    const sideLinks = document.querySelectorAll('.side-menu ul li a');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    const stats = document.querySelectorAll('.num');
    const progressLines = document.querySelectorAll('.progress-line span');
    const aboutSection = document.querySelector('.about');
    const whyUsSection = document.querySelector('.why-us');

    let statsStarted = false;
    let progressStarted = false;
    hamburger.addEventListener('click', () => sideMenu.classList.add('active'));
    closeMenu.addEventListener('click', () => sideMenu.classList.remove('active'));
    sideLinks.forEach(link => {
        link.addEventListener('click', () => sideMenu.classList.remove('active'));
    });
    function startCount(el) {
        let goal = parseInt(el.dataset.val);
        let current = 0;
        let increment = goal / 100; 
        let count = setInterval(() => {
            current += increment;
            el.textContent = Math.ceil(current);
            if (current >= goal) {
                el.textContent = goal;
                clearInterval(count);
            }
        }, 20);
    }
    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY;
        if (scrollPos > 50) {
            header.style.padding = '5px 0';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        if (aboutSection && scrollPos >= aboutSection.offsetTop - 500) {
            if (!statsStarted) {
                stats.forEach(num => startCount(num));
                statsStarted = true;
            }
        }
        if (whyUsSection && scrollPos >= whyUsSection.offsetTop - 500) {
            if (!progressStarted) {
                progressLines.forEach(line => {
                    line.style.width = line.parentElement.getAttribute('data-width');
                });
                progressStarted = true;
            }
        }
    });
    const revealOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal-up')) {
                    entry.target.classList.add('active-reveal-up');
                } else {
                    entry.target.classList.add('active-reveal');
                }
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(el => {
        revealObserver.observe(el);
    });
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const closeModal = document.querySelector(".close-modal");

    document.querySelectorAll(".portfolio-item").forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            modal.style.display = "block";
            modalImg.src = img.src;
            document.body.style.overflow = "hidden"; 
        });
    });

    if (closeModal) {
        closeModal.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            sideMenu.classList.remove('active');
        }
    });
});
function sendToWhatsApp() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('serviceType').value;
    const message = document.getElementById('message').value;
    if (name === "" || phone === "") {
        alert("يرجى ملء الاسم ورقم الجوال أولاً.");
        return;
    }
    const whatsappText = `مرحباً الخبير للتكييف، أرغب في طلب خدمة:
*الاسم:* ${name}
*الجوال:* ${phone}
*نوع الخدمة:* ${service}
*التفاصيل:* ${message}`;
    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/966503914971?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
}