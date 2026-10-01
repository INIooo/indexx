const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const fluidCanvas = `    <!-- Fluid Canvas -->
    <canvas id="fluid-canvas" class="fixed top-0 left-0 w-full h-full -z-[3] pointer-events-none"></canvas>`;

const fluidScript = `    <!-- WebGL Fluid Simulation -->
    <script src="https://cdn.jsdelivr.net/npm/webgl-fluid@0.2.8/dist/webgl-fluid.min.js"></script>
    <script>
        window.addEventListener('load', () => {
            WebGLFluid(document.getElementById('fluid-canvas'), {
                TRIGGER: 'hover',
                SIM_RESOLUTION: 128,
                DYE_RESOLUTION: 512,
                CAPTURE_RESOLUTION: 512,
                DENSITY_DISSIPATION: 2.5,
                VELOCITY_DISSIPATION: 1.5,
                PRESSURE: 0.2,
                PRESSURE_ITERATIONS: 20,
                CURL: 3,
                SPLAT_RADIUS: 0.25,
                SPLAT_FORCE: 6000,
                SHADING: true,
                COLORFUL: true,
                COLOR_UPDATE_SPEED: 10,
                PAUSED: false,
                BACK_COLOR: { r: 250, g: 249, b: 246 },
                TRANSPARENT: false,
                BLOOM: false
            });
            
            // Forward mouse events since canvas is pointer-events-none
            const fluidCanvas = document.getElementById('fluid-canvas');
            const forwardEvent = (e) => {
                const evt = new MouseEvent(e.type, { clientX: e.clientX, clientY: e.clientY, bubbles: true });
                fluidCanvas.dispatchEvent(evt);
            };
            window.addEventListener('mousemove', forwardEvent);
            window.addEventListener('mousedown', forwardEvent);
            window.addEventListener('mouseup', forwardEvent);
        });
    </script>
</body>`;

html = html.replace('<canvas id="webgl-canvas" class="fixed top-0 left-0 w-full h-full -z-[2] pointer-events-none"></canvas>', '<canvas id="webgl-canvas" class="fixed top-0 left-0 w-full h-full -z-[2] pointer-events-none"></canvas>\n\n' + fluidCanvas);
html = html.replace('</body>', fluidScript);

fs.writeFileSync('index.html', html);
console.log('Fluidification injected.');
