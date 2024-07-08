document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navItems = document.querySelectorAll('nav ul li a');
    const header = document.getElementById('header');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroIndicators = document.querySelectorAll('.hero-indicator');
    const heroSlideshow = document.querySelector('.hero-slideshow');
    const ebookSlides = document.querySelectorAll('.ebook-slide');
    const ebookSlideshow = document.querySelector('.ebook-slideshow');
    let currentHeroSlide = 0;
    let currentEbookSlide = 0;
    let lastScrollTop = 0;
    let scrollTimeout;
    let headerTimeout;

    // Menu Toggle Event
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close the menu when a nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    const handleScroll = () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (st > lastScrollTop) {
            // Downscroll
            header.style.top = '-80px'; // Hide the header
        } else {
            // Upscroll
            header.style.top = '0'; // Show the header
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

        clearTimeout(headerTimeout);
        headerTimeout = setTimeout(() => {
            if (window.scrollY > 50) {
                header.style.top = '-80px'; // Hide the header after a short delay
            }
        }, 2000); // Adjust the delay as needed
    };

    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 500);
        }
    });

    const showSlide = (slides, indicators, slideshow, index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            if (indicators[i]) {
                indicators[i].classList.toggle('active', i === index);
            }
        });
    };

    const setupSlideshow = (slides, indicators, slideshow, currentSlide) => {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                slideshow.scrollTo({
                    left: index * slideshow.clientWidth,
                    behavior: 'smooth'
                });
                showSlide(slides, indicators, slideshow, index);
            });
        });

        slideshow.addEventListener('scroll', () => {
            let index = Math.round(slideshow.scrollLeft / slideshow.clientWidth);
            showSlide(slides, indicators, slideshow, index);
        });

        slideshow.addEventListener('scrollend', () => {
            let index = Math.round(slideshow.scrollLeft / slideshow.clientWidth);
            slideshow.scrollTo({
                left: index * slideshow.clientWidth,
                behavior: 'smooth'
            });
            showSlide(slides, indicators, slideshow, index);
        });

        slideshow.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });

        slideshow.addEventListener('touchmove', (event) => {
            endX = event.touches[0].clientX;
        });

        slideshow.addEventListener('touchend', () => {
            let index = Math.round(slideshow.scrollLeft / slideshow.clientWidth);
            slideshow.scrollTo({
                left: index * slideshow.clientWidth,
                behavior: 'smooth'
            });
            showSlide(slides, indicators, slideshow, index);
        });
    };

    // Setup hero slideshow
    setupSlideshow(heroSlides, heroIndicators, heroSlideshow, currentHeroSlide);

    // Setup ebook slideshow without indicators
    ebookSlideshow.addEventListener('scroll', () => {
        let index = Math.round(ebookSlideshow.scrollLeft / ebookSlideshow.clientWidth);
        showSlide(ebookSlides, [], ebookSlideshow, index);
    });

    ebookSlideshow.addEventListener('scrollend', () => {
        let index = Math.round(ebookSlideshow.scrollLeft / ebookSlideshow.clientWidth);
        ebookSlideshow.scrollTo({
            left: index * ebookSlideshow.clientWidth,
            behavior: 'smooth'
        });
        showSlide(ebookSlides, [], ebookSlideshow, index);
    });

    ebookSlideshow.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    ebookSlideshow.addEventListener('touchmove', (event) => {
        endX = event.touches[0].clientX;
    });

    ebookSlideshow.addEventListener('touchend', () => {
        let index = Math.round(ebookSlideshow.scrollLeft / ebookSlideshow.clientWidth);
        ebookSlideshow.scrollTo({
            left: index * ebookSlideshow.clientWidth,
            behavior: 'smooth'
        });
        showSlide(ebookSlides, [], ebookSlideshow, index);
    });
});
