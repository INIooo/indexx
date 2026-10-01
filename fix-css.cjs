const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const replacement = `        body {
            background-color: #faf9f6;
            color: #1a1a1a;
            overflow-x: hidden;
        }

        #intro-loader {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: #1a1a1a;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #c19a4f;
            font-family: 'Rubik Maze', sans-serif;
            font-size: clamp(4rem, 12vw, 10rem);
            pointer-events: none;
            will-change: transform;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }

        .watermark {
            position: absolute;
            font-family: 'Yuyu Short', sans-serif;
            font-weight: 700;
            color: rgba(26, 26, 26, 0.05);
            z-index: -3;
            white-space: nowrap;
            pointer-events: none;
            user-select: none;
            text-align: center;
            width: 100%;
            left: 50%;
            transform: translateX(-50%) translateZ(0);
        }
        .watermark-hero { top: 15vh; font-size: clamp(8rem, 20vw, 24rem); letter-spacing: 0.05em; }
        .watermark-projects { top: 40%; font-size: clamp(6rem, 15vw, 18rem); }
        .watermark-footer { bottom: 0vh; font-size: clamp(6rem, 15vw, 18rem); }

        .btn-gold-outline {
            display: inline-block;
            font-family: 'Yuyu Short', sans-serif;
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 0.1em;
            color: #c19a4f;
            border: 1px solid #c19a4f;
            padding: 1rem 2.5rem;
            text-transform: uppercase;
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            background: transparent;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }`;

html = html.replace(/<style>[\s\S]*?\.btn-gold-outline::before/, '<style>\n' + replacement + '\n\n        .btn-gold-outline::before');
fs.writeFileSync('index.html', html, 'utf-8');
console.log('Fixed CSS');
