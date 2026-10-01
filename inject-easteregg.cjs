const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const scriptChunk = `        // Split text utility for Hero
        const heroTitle = document.querySelector(".hero-title");
        let titleSpans = [];
        let easterEggCaught = 0;
        let isEasterEggActive = false;

        function rebuildTitle(newText) {
            heroTitle.innerHTML = "";
            const chars = newText.split("");
            chars.forEach(char => {
                const span = document.createElement("span");
                span.innerText = char === " " ? "\\u00A0" : char;
                span.style.display = "inline-block";
                
                span.addEventListener("mouseenter", () => {
                    if (!isEasterEggActive && span.dataset.glowing === "true") {
                        easterEggCaught++;
                        span.dataset.glowing = "false";
                        // Flash bright on catch
                        gsap.to(span, { scale: 1.5, color: "#ffffff", duration: 0.2, yoyo: true, repeat: 1 });
                        
                        if (easterEggCaught >= 5) {
                            isEasterEggActive = true;
                            triggerEasterEgg();
                        }
                    }

                    gsap.to(span, { 
                        y: -15, scale: 1.1, color: "#c19a4f", rotationZ: gsap.utils.random(-15, 15),
                        duration: 0.3, ease: "back.out(2)", overwrite: "auto"
                    });
                });
                span.addEventListener("mouseleave", () => {
                    gsap.to(span, { 
                        y: 0, scale: 1, color: "#1a1a1a", rotationZ: 0,
                        duration: 0.6, ease: "bounce.out", overwrite: "auto"
                    });
                });
                heroTitle.appendChild(span);
            });
            titleSpans = heroTitle.querySelectorAll("span");
        }

        function triggerEasterEgg() {
            gsap.to(titleSpans, {
                y: -50, opacity: 0, rotationX: 90, stagger: 0.05, duration: 0.5,
                onComplete: () => {
                    rebuildTitle("ROWHHAN");
                    gsap.fromTo(titleSpans, 
                        { y: 50, opacity: 0, rotationX: -90, filter: "blur(10px)" },
                        { y: 0, opacity: 1, rotationX: 0, filter: "blur(0px)", color: "#c19a4f", duration: 1.2, stagger: 0.1, ease: "elastic.out(1, 0.3)" }
                    );
                }
            });
        }

        if (heroTitle) {
            heroTitle.classList.add("pointer-events-auto", "cursor-crosshair");
            rebuildTitle(heroTitle.innerText);

            // Random pop-up animation loop
            function randomPop() {
                if (titleSpans.length > 0 && !isEasterEggActive) {
                    const span = titleSpans[Math.floor(Math.random() * titleSpans.length)];
                    if (span.innerText.trim() !== "") {
                        span.dataset.glowing = "true";
                        gsap.to(span, { 
                            y: -15, scale: 1.1, color: "#c19a4f", rotationZ: gsap.utils.random(-15, 15),
                            duration: 0.3, ease: "back.out(2)", overwrite: "auto",
                            onComplete: () => {
                                span.dataset.glowing = "false";
                                if (!span.matches(":hover")) {
                                    gsap.to(span, { y: 0, scale: 1, color: "#1a1a1a", rotationZ: 0, duration: 0.6, ease: "bounce.out", overwrite: "auto" });
                                }
                            }
                        });
                    }
                }
                if (!isEasterEggActive) {
                    setTimeout(randomPop, gsap.utils.random(800, 2000));
                }
            }
            setTimeout(randomPop, 3500);
        }`;

const startMarker = '// Split text utility for Hero';
const endMarker = '// Split text utility for About section';
const start = html.indexOf(startMarker);
const end = html.indexOf(endMarker);
if (start !== -1 && end !== -1) {
    html = html.substring(0, start) + scriptChunk + '\n\n        ' + html.substring(end);
    fs.writeFileSync('index.html', html);
    console.log('Easter egg injected');
} else {
    console.log('Failed to find markers');
}
