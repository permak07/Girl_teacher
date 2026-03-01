(function () {
    // SPLASH SCREEN
    const splash = document.getElementById('splash');
    setTimeout(() => {
        splash.classList.add('hidden');
    }, 2000);
    splash.addEventListener('click', () => {
        splash.classList.add('hidden');
    });

    // ГАМБУРГЕР
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // МОДАЛЬНОЕ ОКНО ЗАПИСИ
    const modal = document.getElementById('appointmentModal');
    const openModalBtns = document.querySelectorAll('#openModalBtn, #openModalBtn2');
    const closeModal = document.getElementById('closeModal');

    function openModal() {
        modal.classList.add('active');
    }
    function closeModalFunc() {
        modal.classList.remove('active');
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // ФОРМА
    const form = document.getElementById('appointmentForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо, заявка отправлена! Я свяжусь с вами в ближайшее время.');
        closeModalFunc();
        form.reset();
    });

    // ПЛАВНЫЙ СКРОЛЛ И АКТИВНОЕ МЕНЮ
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function setActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current) {
                link.classList.add('active');
            }
            if (current === 'hero' && link.getAttribute('href') === '#hero') {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (window.innerWidth <= 900) {
                navMenu.classList.remove('open');
            }
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // МОДАЛЬНОЕ ОКНО ДЛЯ ДИПЛОМА (закрытие по клику на фото или фон)
    const diplomaImage = document.querySelector('.diploma-image');
    const diplomaModal = document.getElementById('diplomaModal');
    const diplomaFullImage = document.getElementById('diplomaFullImage');

    if (diplomaImage) {
        diplomaImage.addEventListener('click', () => {
            diplomaFullImage.src = diplomaImage.src;
            diplomaModal.classList.add('active');
        });
    }

    // Закрытие по клику на само изображение
    diplomaFullImage.addEventListener('click', () => {
        diplomaModal.classList.remove('active');
    });

    // Закрытие по клику на фон
    window.addEventListener('click', (e) => {
        if (e.target === diplomaModal) {
            diplomaModal.classList.remove('active');
        }
    });
})();