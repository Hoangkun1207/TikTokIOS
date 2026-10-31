/* =========================================
   HOÀNG KUN iOS — MAIN.JS
   Hiệu ứng giao diện và tương tác
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ---------- CẤU HÌNH ---------- */

    const CONFIG = {
        siteName: "Hoàng Kun iOS",
        snow: true,
        stars: true,
        meteors: true,
        revealOnScroll: true
    };

    /* ---------- HIỆU ỨNG HIỆN DẦN ---------- */

    const revealElements = document.querySelectorAll(
        ".reveal, .card, .app-card, .service-card"
    );

    if (CONFIG.revealOnScroll && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal-ready");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    /* ---------- NÚT MENU MOBILE ---------- */

    const menuButton = document.querySelector(
        ".menu-toggle, .navbar-toggler, #menu-toggle"
    );

    const navigation = document.querySelector(
        ".navbar-menu, .nav-menu, #nav-menu"
    );

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("active");
            menuButton.classList.toggle("active");

            const isExpanded =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("active");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ---------- NÚT LÊN ĐẦU TRANG ---------- */

    const backToTop = document.querySelector(
        "#back-to-top, .back-to-top"
    );

    if (backToTop) {
        window.addEventListener(
            "scroll",
            () => {
                backToTop.classList.toggle(
                    "show",
                    window.scrollY > 350
                );
            },
            { passive: true }
        );

        backToTop.addEventListener("click", (event) => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ---------- HIỆU ỨNG NỀN SAO ---------- */

    if (CONFIG.stars) {
        const starCanvas = document.createElement("canvas");

        starCanvas.id = "hoangkun-stars";
        starCanvas.style.position = "fixed";
        starCanvas.style.inset = "0";
        starCanvas.style.width = "100%";
        starCanvas.style.height = "100%";
        starCanvas.style.pointerEvents = "none";
        starCanvas.style.zIndex = "-1";

        document.body.prepend(starCanvas);

        const context = starCanvas.getContext("2d");
        let stars = [];
        let animationFrame;

        function resizeStarCanvas() {
            const ratio = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            starCanvas.width = window.innerWidth * ratio;
            starCanvas.height = window.innerHeight * ratio;

            context.setTransform(
                ratio,
                0,
                0,
                ratio,
                0,
                0
            );

            createStars();
        }

        function createStars() {
            const amount = Math.floor(
                (window.innerWidth * window.innerHeight) / 9000
            );

            stars = [];

            for (let i = 0; i < amount; i++) {
                stars.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    radius: Math.random() * 1.4 + 0.2,
                    alpha: Math.random() * 0.7 + 0.2,
                    speed: Math.random() * 0.015 + 0.003,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        function drawStars() {
            context.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            const time = Date.now() * 0.001;

            stars.forEach((star) => {
                const opacity =
                    star.alpha +
                    Math.sin(time * star.speed + star.phase) * 0.2;

                context.beginPath();

                context.arc(
                    star.x,
                    star.y,
                    star.radius,
                    0,
                    Math.PI * 2
                );

                context.fillStyle =
                    `rgba(255, 255, 255, ${Math.max(0.1, opacity)})`;

                context.fill();
            });

            animationFrame = requestAnimationFrame(drawStars);
        }

        resizeStarCanvas();
        drawStars();

        window.addEventListener("resize", resizeStarCanvas);

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrame);
            } else {
                drawStars();
            }
        });
    }

    /* ---------- HIỆU ỨNG TUYẾT RƠI ---------- */

    if (CONFIG.snow) {
        const snowContainer = document.createElement("div");

        snowContainer.id = "hoangkun-snow";
        snowContainer.style.position = "fixed";
        snowContainer.style.inset = "0";
        snowContainer.style.overflow = "hidden";
        snowContainer.style.pointerEvents = "none";
        snowContainer.style.zIndex = "999";
        snowContainer.style.opacity = "0.65";

        document.body.appendChild(snowContainer);

        const snowAmount = window.innerWidth < 600 ? 35 : 70;

        for (let i = 0; i < snowAmount; i++) {
            const snowflake = document.createElement("span");

            snowflake.textContent = "❄";

            snowflake.style.position = "absolute";
            snowflake.style.left = Math.random() * 100 + "%";
            snowflake.style.top = "-30px";
            snowflake.style.color = "#ffffff";
            snowflake.style.fontSize =
                Math.random() * 12 + 8 + "px";
            snowflake.style.opacity =
                Math.random() * 0.7 + 0.2;
            snowflake.style.animation =
                `hoangkun-snow-fall ${Math.random() * 8 + 7}s linear infinite`;
            snowflake.style.animationDelay =
                Math.random() * -15 + "s";

            snowContainer.appendChild(snowflake);
        }

        const snowStyle = document.createElement("style");

        snowStyle.textContent = `
            @keyframes hoangkun-snow-fall {
                0% {
                    transform: translate3d(0, -30px, 0) rotate(0deg);
                }

                100% {
                    transform: translate3d(80px, 110vh, 0) rotate(360deg);
                }
            }
        `;

        document.head.appendChild(snowStyle);
    }

    /* ---------- HIỆU ỨNG SAO BĂNG ---------- */

    if (CONFIG.meteors) {
        const meteorContainer = document.createElement("div");

        meteorContainer.id = "hoangkun-meteors";
        meteorContainer.style.position = "fixed";
        meteorContainer.style.inset = "0";
        meteorContainer.style.overflow = "hidden";
        meteorContainer.style.pointerEvents = "none";
        meteorContainer.style.zIndex = "-1";

        document.body.appendChild(meteorContainer);

        const meteorStyle = document.createElement("style");

        meteorStyle.textContent = `
            .hoangkun-meteor {
                position: absolute;
                width: 2px;
                height: 100px;
                background: linear-gradient(
                    to bottom,
                    rgba(255,255,255,0),
                    rgba(255,255,255,0.9)
                );
                transform: rotate(45deg);
                animation: hoangkun-meteor-fall 1.8s linear forwards;
                filter: drop-shadow(0 0 5px #8fd3ff);
            }

            @keyframes hoangkun-meteor-fall {
                0% {
                    opacity: 0;
                    transform: translate(0, 0) rotate(45deg);
                }

                10% {
                    opacity: 1;
                }

                100% {
                    opacity: 0;
                    transform: translate(-350px, 350px) rotate(45deg);
                }
            }
        `;

        document.head.appendChild(meteorStyle);

        function createMeteor() {
            if (document.hidden) return;

            const meteor = document.createElement("span");

            meteor.className = "hoangkun-meteor";
            meteor.style.left = Math.random() * 100 + "%";
            meteor.style.top = Math.random() * 40 + "%";

            meteorContainer.appendChild(meteor);

            setTimeout(() => {
                meteor.remove();
            }, 2000);
        }

        setInterval(() => {
            if (Math.random() > 0.35) {
                createMeteor();
            }
        }, 1800);
    }

    /* ---------- HIỆU ỨNG NÚT ---------- */

    document.querySelectorAll(
        "button, .btn, .button, .app-card"
    ).forEach((element) => {
        element.addEventListener("pointerdown", (event) => {
            const rect = element.getBoundingClientRect();

            const ripple = document.createElement("span");

            ripple.className = "hoangkun-ripple";
            ripple.style.left = event.clientX - rect.left + "px";
            ripple.style.top = event.clientY - rect.top + "px";

            element.style.position =
                getComputedStyle(element).position === "static"
                    ? "relative"
                    : getComputedStyle(element).position;

            element.style.overflow = "hidden";

            element.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 650);
        });
    });

    const rippleStyle = document.createElement("style");

    rippleStyle.textContent = `
        .hoangkun-ripple {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255,255,255,0.45);
            transform: translate(-50%, -50%) scale(0);
            animation: hoangkun-ripple-effect 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes hoangkun-ripple-effect {
            to {
                transform: translate(-50%, -50%) scale(18);
                opacity: 0;
            }
        }

        .reveal-ready {
            opacity: 0;
            transform: translateY(22px);
            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .reveal-ready.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    document.head.appendChild(rippleStyle);

    /* ---------- NĂM HIỆN TẠI ---------- */

    document.querySelectorAll(
        "[data-current-year], #current-year, .current-year"
    ).forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

    /* ---------- CONSOLE ---------- */

    console.log(
        "%cHoàng Kun iOS",
        "color:#8b5cf6;font-size:20px;font-weight:bold;"
    );

    console.log(
        "%cWebsite đã khởi tạo thành công!",
        "color:#06b6d4;font-size:12px;"
    );
});
