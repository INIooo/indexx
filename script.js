        import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
        import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
        // Lenis Smooth Scroll Setup
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync GSAP
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        // Scroll Velocity Skew Effect for Project Cards
        let skewProxy = { skew: 0 };
        let skewSetter = gsap.quickSetter(".project-card", "skewY", "deg");
        let skewClamp = gsap.utils.clamp(-8, 8);
        
        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = skewClamp(self.getVelocity() / -150);
                if (Math.abs(skew) > Math.abs(skewProxy.skew)) {
                    skewProxy.skew = skew;
                    gsap.to(skewProxy, {
                        skew: 0,
                        duration: 0.8,
                        ease: "power3",
                        overwrite: true,
                        onUpdate: () => skewSetter(skewProxy.skew)
                    });
                }
            }
        });

        // Magnetic Buttons
        document.querySelectorAll(".btn-gold-outline").forEach(btn => {
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: "power3.out" });
            });
            btn.addEventListener("mouseleave", () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            });
        });

        // 3D Tilt for Project Cards
        document.querySelectorAll(".project-card").forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(card, {
                    rotationY: x * 0.05,
                    rotationX: -y * 0.05,
                    transformPerspective: 1000,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            card.addEventListener("mouseleave", () => {
                gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.7, ease: "power3.out" });
            });
        });

        // Split text utility for Hero
        const heroTitle = document.querySelector(".hero-title");
        const chars = heroTitle.innerText.split("");
        heroTitle.innerHTML = "";
        chars.forEach(char => {
            const span = document.createElement("span");
            span.innerText = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            heroTitle.appendChild(span);
        });
        const titleSpans = heroTitle.querySelectorAll("span");

        // Split text utility for About section
        const aboutText = document.querySelector(".about-text");
        const words = aboutText.innerText.split(" ");
        aboutText.innerHTML = "";
        words.forEach(word => {
            const span = document.createElement("span");
            span.innerText = word + "\u00A0"; // Use non-breaking space to prevent collapse
            span.style.display = "inline-block";
            aboutText.appendChild(span);
        });

        // Initialize GSAP Animations (Called immediately)
        (function initUIAnimations() {
            const tl = gsap.timeline();
            
            // Loader Animation
            let loaderCounter = { val: 0 };
            tl.to(loaderCounter, {
                val: 100,
                duration: 2.2,
                ease: "power3.inOut",
                onUpdate: function() {
                    let perc = Math.round(loaderCounter.val);
                    document.getElementById("loader-perc").innerText = (perc < 10 ? "00" : (perc < 100 ? "0" : "")) + perc;
                }
            })
            .to("#intro-loader", { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "-=0.2")
            .set("#intro-loader", { display: "none" });
            
            gsap.set(".gs-header, .hero-sub, .hero-desc, .hero-btn", { opacity: 0 });
            gsap.set(titleSpans, { opacity: 0, y: 40, scale: 0.8, filter: "blur(10px)" });
            gsap.set(".watermark-hero", { opacity: 0, scale: 0.9, y: 50 });

            tl.to(".watermark-hero", { opacity: 1, scale: 1, y: 0, duration: 2.5, ease: "expo.out" }, "-=0.6")
              .fromTo(".gs-header", { y: -20 }, { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, "-=2.2")
              .fromTo(".hero-sub", { y: 30, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out" }, "-=2.0")
              .to(titleSpans, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.05, ease: "back.out(1.5)" }, "-=1.7")
              .fromTo(".hero-desc", { y: 20, filter: "blur(5px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.2, ease: "power4.out" }, "-=1.2")
              .fromTo(".hero-btn", { y: 20, filter: "blur(5px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out" }, "-=0.9");

            gsap.to(".watermark-hero", {
                yPercent: 60, rotation: 2, opacity: 0, ease: "none",
                scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1 }
            });
            gsap.to(".watermark-projects", {
                yPercent: -40, rotation: -2, ease: "none",
                scrollTrigger: { trigger: "#projects", start: "top bottom", end: "bottom top", scrub: 1 }
            });
            gsap.to(".watermark-footer", {
                yPercent: -30, ease: "none",
                scrollTrigger: { trigger: "#contact", start: "top bottom", end: "bottom bottom", scrub: 1 }
            });

            gsap.from(".project-card", {
                scrollTrigger: { trigger: "#projects", start: "top 75%" },
                y: 120, scale: 0.9, opacity: 0, rotationY: 10, transformPerspective: 1000, duration: 1.8, stagger: 0.1, ease: "expo.out",
                clearProps: "all"
            });

            gsap.utils.toArray('.reveal-up').forEach(elem => {
                gsap.from(elem, {
                    scrollTrigger: { trigger: elem, start: "top 85%" },
                    y: 60, opacity: 0, filter: "blur(8px)", duration: 1.5, ease: "power4.out"
                });
            });

            // About Text Reveal
            gsap.from(".about-text span", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: 1
                },
                y: 20, opacity: 0.1, filter: "blur(4px)", stagger: 0.1, rotationX: -45, transformOrigin: "left bottom"
            });

            // Marquee Infinite + Scroll Velocity
            const marqueeContent = document.querySelector(".marquee-content");
            let marqueeTween = gsap.to(marqueeContent, {
                xPercent: -33.33,
                ease: "none",
                duration: 15,
                repeat: -1
            });
            
            ScrollTrigger.create({
                onUpdate: (self) => {
                    let velocity = self.getVelocity();
                    gsap.to(marqueeTween, { timeScale: 1 + Math.abs(velocity / 100), duration: 0.5, overwrite: true });
                    gsap.to(marqueeTween, { timeScale: 1, duration: 1, delay: 0.5, overwrite: true });
                }
            });

            // Timeline Animation
            gsap.to(".timeline-line-fill", {
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top 60%",
                    end: "bottom 60%",
                    scrub: 1
                },
                height: "100%",
                ease: "none"
            });

            gsap.utils.toArray(".timeline-node").forEach(node => {
                gsap.to(node, {
                    scrollTrigger: {
                        trigger: node,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    },
                    scale: 1,
                    ease: "back.out(2)",
                    duration: 0.6
                });
            });

        })();



        const canvas = document.getElementById('webgl-canvas');
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Elegant Studio Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffeedd, 2.5);
        mainLight.position.set(5, 10, 7);
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0xc19a4f, 1); // Soft gold fill
        fillLight.position.set(-5, 0, -5);
        scene.add(fillLight);

        let model;
        const loader = new GLTFLoader();

        loader.load('./Model.glb', (gltf) => {
            model = gltf.scene;

            try {
                // Auto-Center and Normalize Scale (Makes it work perfectly no matter the original model size)
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 0 && isFinite(maxDim)) {
                    const scale = 7 / maxDim; // Normalize to roughly 7 units tall
                    model.scale.setScalar(scale);
                    model.position.sub(center.multiplyScalar(scale)); 
                }
                
                // Initial positioning for Hero Section
                model.position.y = -1; 
            } catch (e) {
                console.error("Error normalizing model scale:", e);
                // Fallback position if box computation fails
                model.position.set(0, -1, 0);
            }
            
            scene.add(model);

            try {
                setupScrollTrigger();
            } catch (e) {
                console.error("Error setting up scroll trigger:", e);
            }
        }, undefined, (error) => {
            console.error('Error loading 3D model:', error);
        });

        function setupScrollTrigger() {
            // Constant idle rotation
            gsap.to(model.rotation, {
                y: Math.PI * 2,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

            // Tie model position/rotation to scroll progress
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });

            // As you scroll down the page, model moves right and up, and tilts
            tl.to(model.position, {
                x: 3,
                y: 5,
                ease: "power1.inOut"
            }, 0)
            .to(model.rotation, {
                x: Math.PI / 6,
                z: -Math.PI / 12,
                ease: "power1.inOut"
            }, 0);
        }

        // Mouse for Parallax
        let normMouseX = 0;
        let normMouseY = 0;
        window.addEventListener("mousemove", (e) => {
            normMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            normMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Render Loop
        const clock = new THREE.Clock();
        function tick() {
            // Elegant camera parallax based on mouse
            camera.position.x += (normMouseX * 1.5 - camera.position.x) * 0.05;
            camera.position.y += (normMouseY * 1.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        }
        tick();

        // Handle Resizing
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
