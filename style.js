document.addEventListener("DOMContentLoaded", () => {

    const nav = document.getElementById("nav");
    const navItems = document.querySelectorAll("#nav .icons p");

    const homeSection = document.querySelector(".banner");
    const sections = [
        document.getElementById("part2"),
        document.getElementById("part3"),
        document.getElementById("part4"),
        document.getElementById("part5"),
        document.getElementById("part6"),
        document.getElementById("part7")
    ];

    const artistSlider = document.querySelector(".flex-box");
    const artistImages = document.querySelectorAll(".flex-box img");

    const gallery = document.querySelectorAll("#part6 img");

    const brochure = document.querySelector("#align h3");
    const busRoute = document.querySelector(".slide h4");


    navItems.forEach(item => {

        item.style.cursor = "pointer";

        item.addEventListener("click", () => {

            const text = item.innerText.trim().toLowerCase();

            let target = null;

            if (text === "home") {
                target = homeSection;
            }

            else if (text === "about") {
                target = document.getElementById("part2");
            }

            else if (text === "department") {
                target = document.getElementById("part5");
            }

            else if (text === "admission") {
                target = document.getElementById("part4");
            }

            else if (text === "placements") {
                target = document.getElementById("part6");
            }

            else if (text === "contact us") {
                target = document.getElementById("part7");
            }

            else if (text === "login") {
                showToast("Login section coming soon!");
                return;
            }

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    const allSections = [
        homeSection,
        ...sections
    ];

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    let activeText = "";

                    if (entry.target === homeSection) {
                        activeText = "home";
                    }

                    else if (entry.target.id === "part2") {
                        activeText = "about";
                    }

                    else if (entry.target.id === "part5") {
                        activeText = "department";
                    }

                    else if (entry.target.id === "part4") {
                        activeText = "admission";
                    }

                    else if (entry.target.id === "part6") {
                        activeText = "placements";
                    }

                    else if (entry.target.id === "part7") {
                        activeText = "contact us";
                    }

                    navItems.forEach(item => {

                        if (item.innerText.trim().toLowerCase() === activeText) {

                            item.style.transition = "0.3s";
                            item.style.color = "#ffcc00";

                        }

                        else {

                            item.style.color = "";

                        }

                    });

                }

            });

        },

        {
            threshold: 0.35
        }

    );


    allSections.forEach(section => {

        if (section) {
            observer.observe(section);
        }

    });


    if (artistSlider) {

        artistSlider.addEventListener("mouseenter", () => {

            artistSlider.style.animationPlayState = "paused";

        });

        artistSlider.addEventListener("mouseleave", () => {

            artistSlider.style.animationPlayState = "running";

        });

    }


    document.addEventListener("visibilitychange", () => {

        if (!artistSlider) return;

        if (document.hidden) {

            artistSlider.style.animationPlayState = "paused";

        }

        else {

            artistSlider.style.animationPlayState = "running";

        }

    });


    const viewer = document.createElement("div");

    viewer.id = "jsImageViewer";

    viewer.style.position = "fixed";
    viewer.style.top = "0";
    viewer.style.left = "0";
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.style.background = "rgba(0,0,0,0.92)";
    viewer.style.display = "none";
    viewer.style.alignItems = "center";
    viewer.style.justifyContent = "center";
    viewer.style.flexDirection = "column";
    viewer.style.zIndex = "99999";
    viewer.style.padding = "20px";
    viewer.style.boxSizing = "border-box";

    document.body.appendChild(viewer);


    const viewerImage = document.createElement("img");

    viewerImage.style.maxWidth = "90%";
    viewerImage.style.maxHeight = "80%";
    viewerImage.style.objectFit = "contain";
    viewerImage.style.borderRadius = "12px";
    viewerImage.style.boxShadow = "0 10px 50px rgba(255,255,255,0.2)";

    viewer.appendChild(viewerImage);


    const closeButton = document.createElement("button");

    closeButton.innerHTML = "✕";

    closeButton.style.position = "absolute";
    closeButton.style.top = "25px";
    closeButton.style.right = "30px";
    closeButton.style.fontSize = "30px";
    closeButton.style.background = "transparent";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";

    viewer.appendChild(closeButton);


    function openImageViewer(src) {

        viewerImage.src = src;

        viewer.style.display = "flex";

        document.body.style.overflow = "hidden";

    }


    function closeImageViewer() {

        viewer.style.display = "none";

        viewerImage.src = "";

        document.body.style.overflow = "";

    }


    closeButton.addEventListener("click", closeImageViewer);


    viewer.addEventListener("click", event => {

        if (event.target === viewer) {

            closeImageViewer();

        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeImageViewer();

        }

    });


    artistImages.forEach(image => {

        image.style.cursor = "pointer";

        image.addEventListener("click", () => {

            openImageViewer(image.src);

        });

    });


    gallery.forEach(image => {

        image.style.cursor = "pointer";

        image.addEventListener("click", () => {

            openImageViewer(image.src);

        });

    });


    gallery.forEach(image => {

        image.style.transition = "transform 0.3s ease, filter 0.3s ease";

        image.addEventListener("mouseenter", () => {

            image.style.transform = "scale(1.05)";
            image.style.filter = "brightness(1.15)";

        });


        image.addEventListener("mouseleave", () => {

            image.style.transform = "";
            image.style.filter = "";

        });

    });


    if (brochure) {

        brochure.style.cursor = "pointer";

        brochure.addEventListener("click", () => {

            showToast("Event Brochure section opened!");

            const gallerySection = document.getElementById("part6");

            if (gallerySection) {

                setTimeout(() => {

                    gallerySection.scrollIntoView({
                        behavior: "smooth"
                    });

                }, 500);

            }

        });

    }


    if (busRoute) {

        busRoute.style.cursor = "pointer";

        busRoute.addEventListener("click", () => {

            showToast("Bus Route information selected!");

        });

    }


    const toast = document.createElement("div");

    toast.id = "jsToast";

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    toast.style.background = "rgba(0,0,0,0.9)";
    toast.style.color = "white";
    toast.style.padding = "14px 25px";
    toast.style.borderRadius = "30px";
    toast.style.fontSize = "15px";
    toast.style.zIndex = "100000";
    toast.style.opacity = "0";
    toast.style.pointerEvents = "none";
    toast.style.transition = "all 0.4s ease";

    document.body.appendChild(toast);


    let toastTimer;


    function showToast(message) {

        toast.innerText = message;

        toast.style.opacity = "1";

        toast.style.transform =
            "translateX(-50%) translateY(0)";

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.style.opacity = "0";

            toast.style.transform =
                "translateX(-50%) translateY(20px)";

        }, 2500);

    }


    const revealElements = [
        document.getElementById("part2"),
        document.getElementById("part3"),
        document.getElementById("part4"),
        document.getElementById("part5"),
        document.getElementById("part6"),
        document.getElementById("part7")
    ];


    revealElements.forEach(element => {

        if (!element) return;

        element.style.opacity = "0";
        element.style.transform = "translateY(40px)";
        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

    });


    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    revealElements.forEach(element => {

        if (element) {

            revealObserver.observe(element);

        }

    });


    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.id = "jsTopButton";

    topButton.style.position = "fixed";
    topButton.style.right = "25px";
    topButton.style.bottom = "25px";
    topButton.style.width = "48px";
    topButton.style.height = "48px";
    topButton.style.borderRadius = "50%";
    topButton.style.border = "none";
    topButton.style.background = "#111";
    topButton.style.color = "white";
    topButton.style.fontSize = "24px";
    topButton.style.cursor = "pointer";
    topButton.style.zIndex = "9999";
    topButton.style.opacity = "0";
    topButton.style.pointerEvents = "none";
    topButton.style.transition = "0.3s";

    document.body.appendChild(topButton);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.style.opacity = "1";
            topButton.style.pointerEvents = "auto";

        }

        else {

            topButton.style.opacity = "0";
            topButton.style.pointerEvents = "none";

        }

    });


    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    const footerItems = document.querySelectorAll("#part7 li");

    footerItems.forEach(item => {

        item.style.cursor = "pointer";

        item.addEventListener("mouseenter", () => {

            item.style.transition = "0.2s";

            item.style.transform = "translateX(5px)";

        });


        item.addEventListener("mouseleave", () => {

            item.style.transform = "translateX(0)";

        });

    });


    if (nav) {

        nav.style.opacity = "0";
        nav.style.transform = "translateY(-20px)";

        setTimeout(() => {

            nav.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            nav.style.opacity = "1";
            nav.style.transform = "translateY(0)";

        }, 100);

    }


    document.addEventListener("keydown", event => {

        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }


        if (event.key.toLowerCase() === "h") {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }


        if (event.key.toLowerCase() === "g") {

            const gallerySection =
                document.getElementById("part6");

            if (gallerySection) {

                gallerySection.scrollIntoView({

                    behavior: "smooth"

                });

            }

        }

    });


    setTimeout(() => {

        showToast("Welcome to CollegeUNIVERSE 🎉");

    }, 1200);


    console.log(
        "%c CollegeUNIVERSE loaded successfully! 🎉 ",
        "background:#111;color:#fff;padding:8px;border-radius:5px;"
    );

});