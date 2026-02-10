class PixelOffice {
    constructor(options = {}) {
        this.containerId = options.containerId || 'officeContainer';
        this.visitorCount = options.visitorCount || 0;
        this.maxVisibleCharacters = options.maxCharacters || 50;
        this.characterBasePath = options.characterBasePath || '/images/character';
        
        this.container = document.getElementById(this.containerId);
        this.charactersContainer = document.getElementById('charactersContainer');
        this.furnitureContainer = document.getElementById('furnitureContainer');
        
        this.seed = this.getTimeSeed();
        this.characters = [];
        this.bounds = { minX: 20, maxX: 820, minY: 95, maxY: 450 };
        
        this.furnitureCollisions = [
            { x: 50, y: 120, width: 120, height: 60 },
            { x: 200, y: 120, width: 120, height: 60 },
            { x: 350, y: 120, width: 120, height: 60 },
            { x: 100, y: 250, width: 120, height: 60 },
            { x: 280, y: 250, width: 120, height: 60 },
            { x: 550, y: 150, width: 150, height: 100 },
            { x: 20, y: 90, width: 40, height: 60 },
            { x: 840, y: 90, width: 40, height: 60 },
            { x: 450, y: 380, width: 40, height: 60 },
            { x: 830, y: 300, width: 30, height: 50 },
            { x: 50, y: 400, width: 120, height: 45 },
            { x: 70, y: 460, width: 80, height: 40 },
            { x: 0, y: 0, width: 900, height: 90 }
        ];
        
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
        this.renderFurniture();
        this.renderCharacters();
        this.startNPCBehavior();
    }
    
    checkCollision(x, y, w = 32, h = 48) {
        const pad = 3;
        return this.furnitureCollisions.some(f => 
            x < f.x + f.width + pad && x + w > f.x - pad &&
            y < f.y + f.height + pad && y + h > f.y - pad
        );
    }
    
    getRandomWalkablePosition() {
        for (let i = 0; i < 50; i++) {
            const x = this.bounds.minX + this.random() * (this.bounds.maxX - this.bounds.minX);
            const y = this.bounds.minY + this.random() * (this.bounds.maxY - this.bounds.minY);
            if (!this.checkCollision(x, y)) return { x, y };
        }
        return { x: 400, y: 300 };
    }
    
    findValidTarget(fromX, fromY) {
        for (let i = 0; i < 20; i++) {
            const angle = this.random() * Math.PI * 2;
            const dist = 50 + this.random() * 150;
            const x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, fromX + Math.cos(angle) * dist));
            const y = Math.max(this.bounds.minY, Math.min(this.bounds.maxY, fromY + Math.sin(angle) * dist));
            if (!this.checkCollision(x, y)) return { x, y };
        }
        return null;
    }
    
    startNPCBehavior() {
        setInterval(() => {
            this.seed = this.getTimeSeed(2);
            this.characters.forEach((char, i) => {
                if (!char.isWalking && this.seededRandom(this.seed + i) < 0.3) {
                    this.walkCharacter(char, i);
                }
            });
        }, 2000);
    }
    
    walkCharacter(char, index) {
        const target = this.findValidTarget(char.x, char.y);
        if (!target) return;
        
        char.isWalking = true;
        const el = char.element;
        
        el.classList.toggle('facing-left', target.x < char.x);
        el.classList.replace('idle', 'walking');
        
        const dist = Math.hypot(target.x - char.x, target.y - char.y);
        const duration = (dist / 80) * 1000;
        
        el.style.transition = `left ${duration}ms linear, top ${duration}ms linear`;
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
            <div class="furniture desk" style="left:50px;top:120px"></div>
            <div class="furniture desk" style="left:200px;top:120px"></div>
            <div class="furniture desk" style="left:350px;top:120px"></div>
            <div class="furniture desk" style="left:100px;top:250px"></div>
            <div class="furniture desk" style="left:280px;top:250px"></div>
            <div class="furniture" style="left:550px;top:150px;width:150px;height:100px;background:linear-gradient(180deg,#d4a574,#b8956a);border:4px solid #8b7355;border-radius:8px"></div>
            <div class="furniture plant" style="left:20px;top:90px"></div>
            <div class="furniture plant" style="right:20px;top:90px"></div>
            <div class="furniture plant" style="left:450px;top:380px"></div>
            <div class="furniture" style="right:40px;top:300px;width:30px;height:50px;background:linear-gradient(180deg,#87ceeb,#4a90d9);border:3px solid #2d5aa0;border-radius:4px"></div>
            <div class="furniture" style="left:50px;top:400px;width:120px;height:45px;background:linear-gradient(180deg,#6b5b95,#5a4a84);border:3px solid #4a3a74;border-radius:8px"></div>
            <div class="furniture" style="left:70px;top:460px;width:80px;height:40px;background:linear-gradient(180deg,#c9a66b,#a08050);border:3px solid #806040;border-radius:4px"></div>
        `;
    }
    
    createCharacterHTML() {
        const base = this.characterBasePath;
        
        // Define your character part variations
        const heads = ['Temp-head.gif', 'head-1.gif', 'head-2.gif', 'head-3.gif', 'head-4.gif'];
        const bodies = ['Temp-body.gif', 'body-1.gif', 'body-2.gif', 'body-3.gif'];
        const feet = ['Temp-foot.gif', 'foot-1.gif', 'foot-2.gif'];
        
        // Randomly select each part
        const head = heads[Math.floor(this.random() * heads.length)];
        const body = bodies[Math.floor(this.random() * bodies.length)];
        const foot = feet[Math.floor(this.random() * feet.length)];
        
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