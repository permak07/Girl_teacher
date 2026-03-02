(function () {
    // SPLASH SCREEN
    const splash = document.getElementById('splash');

    // Функция скрытия заставки (чтобы не дублировать код)
    function hideSplash() {
        if (!splash.classList.contains('hidden')) {
            splash.classList.add('hidden');
            document.body.classList.remove('splash-active'); // разблокируем прокрутку
        }
    }

    // Блокируем прокрутку сразу при загрузке
    document.body.classList.add('splash-active');

    // Скрываем через 2 секунды
    setTimeout(hideSplash, 2000);

    // Скрываем по клику на заставку
    splash.addEventListener('click', hideSplash);

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

    // ФОРМА (отправка на Formspree)
    const form = document.getElementById('appointmentForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/mjgedqoq', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Спасибо, заявка отправлена! Я свяжусь с вами в ближайшее время.');
                closeModalFunc();      // закрываем модальное окно
                form.reset();          // очищаем поля формы
            } else {
                // Если сервер вернул ошибку (например, спам-фильтр)
                const data = await response.json();
                alert(data.error || 'Ошибка при отправке. Попробуйте ещё раз или напишите в Telegram.');
            }
        } catch (error) {
            alert('Ошибка соединения. Проверьте интернет или попробуйте позже.');
        }
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