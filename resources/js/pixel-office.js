class PixelOffice {
    constructor(options = {}) {
        this.containerId = options.containerId || 'officeContainer';
        this.visitorCount = options.visitorCount || 0;
        this.maxVisibleCharacters = options.maxCharacters || 50;
        this.characterBasePath = options.characterBasePath || '/images/character';

        this.container = document.getElementById(this.containerId);
        this.scaler = document.getElementById('officeScaler');
        this.charactersContainer = document.getElementById('charactersContainer');
        this.furnitureContainer = document.getElementById('furnitureContainer');

        this.seed = this.getTimeSeed();
        this.characters = [];
        this.bounds = { minX: 20, maxX: 820, minY: 95, maxY: 450 };
        this.furnitureCollisions = [];

        this.init();
    }

    getTimeSeed(interval = 2) { return Math.floor(Date.now() / (interval * 1000)); }

    seededRandom(seed) {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    random() { return this.seededRandom(++this.seed); }

    init() {
        this.scaleToFit();
        this.renderFurniture();
        this.buildCollisions();
        this.renderCharacters();
        this.startNPCBehavior();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.scaleToFit(), 150);
        });
    }

    scaleToFit() {
        if (!this.scaler || !this.container) return;
        const scalerWidth = this.scaler.clientWidth;
        const scale = scalerWidth / 900;
        this.container.style.transform = `scale(${scale})`;
    }

    buildCollisions() {
        // Wall collision (always present)
        this.furnitureCollisions = [
            { x: 0, y: 0, width: 900, height: 90 }
        ];

        // Build from rendered furniture elements
        const items = this.furnitureContainer.querySelectorAll('.furniture');
        items.forEach(el => {
            const style = el.style;
            const w = el.offsetWidth;
            const h = el.offsetHeight;
            const y = parseFloat(style.top) || 0;

            // Handle both left and right positioning
            let x;
            if (style.left) {
                x = parseFloat(style.left);
            } else if (style.right) {
                x = 900 - parseFloat(style.right) - w;
            } else {
                x = el.offsetLeft;
            }

            this.furnitureCollisions.push({ x, y, width: w, height: h });
        });
    }

    checkCollision(x, y, w = 20, h = 70) {
        const pad = 0;
        return this.furnitureCollisions.some(f =>
            x < f.x + f.width + pad && x + w > f.x - pad &&
            y < f.y + f.height + pad && y + h > f.y - pad
        );
    }

    getRandomWalkablePosition() {
        for (let i = 0; i < 100; i++) {
            const x = this.bounds.minX + this.random() * (this.bounds.maxX - this.bounds.minX);
            const y = this.bounds.minY + this.random() * (this.bounds.maxY - this.bounds.minY);
            if (!this.checkCollision(x, y)) return { x, y };
        }
        return { x: 450, y: 380 };
    }

    findValidTarget(fromX, fromY) {
        for (let i = 0; i < 20; i++) {
            const angle = this.random() * Math.PI * 2;
            const dist = 30 + this.random() * 80;
            const x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, fromX + Math.cos(angle) * dist));
            const y = Math.max(this.bounds.minY, Math.min(this.bounds.maxY, fromY + Math.sin(angle) * dist));
            // Check target AND path
            if (!this.checkCollision(x, y) && !this.pathBlocked(fromX, fromY, x, y))
                return { x, y };
        }
        return null;
    }
    pathBlocked(x1, y1, x2, y2) {
        const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 16);
        for (let i = 1; i < steps; i++) {
            const t = i / steps;
            const x = x1 + (x2 - x1) * t;
            const y = y1 + (y2 - y1) * t;
            if (this.checkCollision(x, y)) return true;
        }
        return false;
    }

    startNPCBehavior() {
        setInterval(() => {
            this.seed = this.getTimeSeed(2);
            this.characters.forEach((char, i) => {
                const moveChance = 0.1 + (i % 5) * 0.05;
                if (!char.isWalking && this.seededRandom(this.seed + i) < moveChance) {
                    this.walkCharacter(char, i);
                }
            });
        }, 2000);
    }

    walkCharacter(char, index) {
        const speed = 60 + this.random() * 60;
        const target = this.findValidTarget(char.x, char.y);
        if (!target) return;

        char.isWalking = true;
        const el = char.element;

        el.classList.toggle('facing-left', target.x < char.x);
        el.classList.replace('idle', 'walking');

        const dist = Math.hypot(target.x - char.x, target.y - char.y);
        const duration = (dist / speed) * 1000;

        el.style.transition = `left ${duration}ms ease-out, top ${duration}ms ease-out`;
        el.style.left = `${target.x}px`;
        el.style.top = `${target.y}px`;
        el.style.zIndex = Math.floor(target.y);

        char.x = target.x;
        char.y = target.y;

        setTimeout(() => {
            char.isWalking = false;
            el.classList.replace('walking', 'idle');
        }, duration);
    }

    renderFurniture() {
        this.furnitureContainer.innerHTML = `
            <div class="furniture desk" style="left:50px;top:120px"><img src="/images/Table-TEST.png"></div>
            <div class="furniture desk" style="left:200px;top:120px"><img src="/images/Table-TEST.png"></div>
            <div class="furniture desk" style="left:350px;top:120px"><img src="/images/Table-TEST.png"></div>
            <div class="furniture desk" style="left:100px;top:250px"><img src="/images/Table-TEST.png"></div>
            <div class="furniture desk" style="left:280px;top:250px"><img src="/images/Table-TEST.png"></div>
            <div class="furniture" style="left:550px;top:150px;width:150px;height:100px;background:linear-gradient(180deg,#d4a574,#b8956a);border:4px solid #8b7355;border-radius:8px"></div>
            <div class="furniture plant" style="right:85px;top:90px"><img src="/images/Booth-FULL.png"></div>
            <div class="furniture plant" style="right:25px;top:90px"><img src="/images/Booth-FULL.png"></div>
            <div class="furniture plant" style="right:145px;top:90px"><img src="/images/Booth-FULL.png"></div>
            <div class="furniture" style="right:40px;top:300px;width:30px;height:50px;background:linear-gradient(180deg,#87ceeb,#4a90d9);border:3px solid #2d5aa0;border-radius:4px"></div>
            <div class="furniture" style="left:50px;top:400px;width:120px;height:45px;background:linear-gradient(180deg,#6b5b95,#5a4a84);border:3px solid #4a3a74;border-radius:8px"></div>
            <div class="furniture" style="left:70px;top:460px;width:80px;height:40px;background:linear-gradient(180deg,#c9a66b,#a08050);border:3px solid #806040;border-radius:4px"></div>
        `;
    }

    createCharacterHTML() {
        const base = this.characterBasePath;

        // Define your character part variations
        const headCount = 104;   // e.g., head-1.gif to head-20.gif
        const bodyCount = 12;   // e.g., body-1.gif to body-10.gif
        const footCount = 5;    // e.g., foot-1.gif to foot-5.gif

        // Randomly select each part
        const headNum = Math.floor(this.random() * headCount) + 1;
        const bodyNum = Math.floor(this.random() * bodyCount) + 1;
        const footNum = Math.floor(this.random() * footCount) + 1;

        const head = `head-${headNum}.gif`;
        const body = `body-${bodyNum}.gif`;
        const foot = `foot-${footNum}.gif`;

        return `<div class="character-sprite" style="position:relative;width:150%;height:150%">
            <img src="${base}/${foot}" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:100%;image-rendering:pixelated">
            <img src="${base}/${body}" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:100%;image-rendering:pixelated">
            <img src="${base}/${head}" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:100%;image-rendering:pixelated">
        </div>`;
    }

    renderCharacters() {
        const num = Math.min(this.visitorCount, this.maxVisibleCharacters);
        this.charactersContainer.innerHTML = '';
        this.characters = [];

        for (let i = 0; i < num; i++) {
            const pos = this.getRandomWalkablePosition();
            const el = document.createElement('div');
            el.className = 'pixel-character idle';
            el.style.cssText = `left:${pos.x}px;top:${pos.y}px;z-index:${Math.floor(pos.y)};opacity:0;transform:scale(0)`;
            if (this.random() > 0.5) el.classList.add('facing-left');
            el.innerHTML = this.createCharacterHTML();

            this.characters.push({ element: el, x: pos.x, y: pos.y, isWalking: false });
            this.charactersContainer.appendChild(el);

            setTimeout(() => {
                el.style.transition = 'opacity 0.3s,transform 0.3s cubic-bezier(0.34,1.56,0.64,1),left 0.8s linear,top 0.8s linear';
                el.style.opacity = '1';
                el.style.transform = 'scale(1)';
            }, i * 50);
        }
    }

    addCharacter() {
        this.visitorCount++;
        if (this.characters.length < this.maxVisibleCharacters) {
            const pos = this.getRandomWalkablePosition();
            const el = document.createElement('div');
            el.className = 'pixel-character idle';
            el.style.cssText = `left:${pos.x}px;top:${pos.y}px;z-index:${Math.floor(pos.y)};opacity:0;transform:scale(0)`;
            if (this.random() > 0.5) el.classList.add('facing-left');
            el.innerHTML = this.createCharacterHTML();

            this.characters.push({ element: el, x: pos.x, y: pos.y, isWalking: false });
            this.charactersContainer.appendChild(el);

            setTimeout(() => {
                el.style.transition = 'opacity 0.3s,transform 0.3s cubic-bezier(0.34,1.56,0.64,1),left 0.8s linear,top 0.8s linear';
                el.style.opacity = '1';
                el.style.transform = 'scale(1)';
            }, 50);
        }
        return this.visitorCount;
    }
}

// Export for module usage or attach to window
if (typeof module !== 'undefined') module.exports = PixelOffice;
else window.PixelOffice = PixelOffice;