// NFT Assembler JavaScript
class NFTAssembler {
    constructor() {
        this.canvas = document.getElementById('nftCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentTraits = {
            background: null,
            body: null,
            eyes: null,
            accessories: null
        };
        this.gallery = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.clearCanvas();
    }
    
    setupEventListeners() {
        // Trait selection
        document.querySelectorAll('.trait-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const category = e.target.closest('.trait-options').dataset.category;
                const trait = e.target.dataset.trait;
                this.selectTrait(category, trait, e.target);
            });
        });
        
        // Canvas controls
        document.getElementById('randomizeBtn').addEventListener('click', () => this.randomize());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearAll());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadNFT());
        
        // Gallery controls
        document.getElementById('generateBatchBtn').addEventListener('click', () => this.generateBatch(10));
        document.getElementById('clearGalleryBtn').addEventListener('click', () => this.clearGallery());
        document.getElementById('exportAllBtn').addEventListener('click', () => this.exportAll());
        
        // Export controls
        document.getElementById('exportSingleBtn').addEventListener('click', () => this.downloadNFT());
        document.getElementById('exportBatchBtn').addEventListener('click', () => {
            const size = parseInt(document.getElementById('batchSize').value) || 10;
            this.generateBatch(size);
        });
        document.getElementById('exportMetadataBtn').addEventListener('click', () => this.exportMetadata());
    }
    
    selectTrait(category, trait, element) {
        // Remove previous selection in category
        element.closest('.trait-options').querySelectorAll('.trait-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selection to clicked element
        element.classList.add('selected');
        
        // Update current traits
        this.currentTraits[category] = trait;
        
        // Redraw canvas
        this.drawNFT();
    }
    
    drawNFT() {
        this.clearCanvas();
        
        // Draw background
        if (this.currentTraits.background) {
            this.drawBackground(this.currentTraits.background);
        }
        
        // Draw body
        if (this.currentTraits.body) {
            this.drawBody(this.currentTraits.body);
        }
        
        // Draw eyes
        if (this.currentTraits.eyes) {
            this.drawEyes(this.currentTraits.eyes);
        }
        
        // Draw accessories
        if (this.currentTraits.accessories && this.currentTraits.accessories !== 'none') {
            this.drawAccessories(this.currentTraits.accessories);
        }
    }
    
    clearCanvas() {
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawBackground(type) {
        const colors = {
            blue: '#3b82f6',
            red: '#ef4444',
            green: '#10b981',
            purple: '#8b5cf6'
        };
        
        this.ctx.fillStyle = colors[type] || '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawBody(type) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const size = 120;
        
        this.ctx.fillStyle = '#fbbf24';
        this.ctx.strokeStyle = '#92400e';
        this.ctx.lineWidth = 3;
        
        switch (type) {
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
                break;
                
            case 'square':
                this.ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size);
                this.ctx.strokeRect(centerX - size / 2, centerY - size / 2, size, size);
                break;
                
            case 'triangle':
                this.ctx.beginPath();
                this.ctx.moveTo(centerX, centerY - size / 2);
                this.ctx.lineTo(centerX - size / 2, centerY + size / 2);
                this.ctx.lineTo(centerX + size / 2, centerY + size / 2);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();
                break;
                
            case 'hexagon':
                this.drawHexagon(centerX, centerY, size / 2);
                break;
        }
    }
    
    drawHexagon(x, y, radius) {
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = x + radius * Math.cos(angle);
            const py = y + radius * Math.sin(angle);
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    
    drawEyes(type) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2 - 20;
        const eyeSize = 15;
        const eyeSpacing = 30;
        
        this.ctx.fillStyle = '#1f2937';
        
        switch (type) {
            case 'normal':
                // Left eye
                this.ctx.beginPath();
                this.ctx.arc(centerX - eyeSpacing, centerY, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
                // Right eye
                this.ctx.beginPath();
                this.ctx.arc(centerX + eyeSpacing, centerY, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
                break;
                
            case 'sleepy':
                this.ctx.lineWidth = 4;
                this.ctx.strokeStyle = '#1f2937';
                // Left eye
                this.ctx.beginPath();
                this.ctx.moveTo(centerX - eyeSpacing - eyeSize, centerY);
                this.ctx.lineTo(centerX - eyeSpacing + eyeSize, centerY);
                this.ctx.stroke();
                // Right eye
                this.ctx.beginPath();
                this.ctx.moveTo(centerX + eyeSpacing - eyeSize, centerY);
                this.ctx.lineTo(centerX + eyeSpacing + eyeSize, centerY);
                this.ctx.stroke();
                break;
                
            case 'wink':
                // Left eye (closed)
                this.ctx.lineWidth = 4;
                this.ctx.strokeStyle = '#1f2937';
                this.ctx.beginPath();
                this.ctx.moveTo(centerX - eyeSpacing - eyeSize, centerY);
                this.ctx.lineTo(centerX - eyeSpacing + eyeSize, centerY);
                this.ctx.stroke();
                // Right eye (open)
                this.ctx.fillStyle = '#1f2937';
                this.ctx.beginPath();
                this.ctx.arc(centerX + eyeSpacing, centerY, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
                break;
                
            case 'laser':
                this.ctx.fillStyle = '#ef4444';
                // Left eye
                this.ctx.beginPath();
                this.ctx.arc(centerX - eyeSpacing, centerY, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
                // Right eye
                this.ctx.beginPath();
                this.ctx.arc(centerX + eyeSpacing, centerY, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
                // Laser beams
                this.ctx.strokeStyle = '#ef4444';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.moveTo(centerX - eyeSpacing, centerY);
                this.ctx.lineTo(0, centerY);
                this.ctx.moveTo(centerX + eyeSpacing, centerY);
                this.ctx.lineTo(this.canvas.width, centerY);
                this.ctx.stroke();
                break;
        }
    }
    
    drawAccessories(type) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        switch (type) {
            case 'hat':
                this.ctx.fillStyle = '#7c2d12';
                this.ctx.fillRect(centerX - 80, centerY - 120, 160, 30);
                this.ctx.fillRect(centerX - 50, centerY - 150, 100, 30);
                break;
                
            case 'glasses':
                this.ctx.strokeStyle = '#1f2937';
                this.ctx.lineWidth = 4;
                // Left lens
                this.ctx.beginPath();
                this.ctx.arc(centerX - 30, centerY - 20, 25, 0, Math.PI * 2);
                this.ctx.stroke();
                // Right lens
                this.ctx.beginPath();
                this.ctx.arc(centerX + 30, centerY - 20, 25, 0, Math.PI * 2);
                this.ctx.stroke();
                // Bridge
                this.ctx.beginPath();
                this.ctx.moveTo(centerX - 5, centerY - 20);
                this.ctx.lineTo(centerX + 5, centerY - 20);
                this.ctx.stroke();
                break;
                
            case 'crown':
                this.ctx.fillStyle = '#fbbf24';
                this.ctx.strokeStyle = '#92400e';
                this.ctx.lineWidth = 2;
                // Crown base
                this.ctx.fillRect(centerX - 60, centerY - 120, 120, 20);
                this.ctx.strokeRect(centerX - 60, centerY - 120, 120, 20);
                // Crown points
                for (let i = 0; i < 5; i++) {
                    const x = centerX - 50 + (i * 25);
                    const height = i % 2 === 0 ? 30 : 20;
                    this.ctx.fillRect(x, centerY - 120 - height, 20, height);
                    this.ctx.strokeRect(x, centerY - 120 - height, 20, height);
                }
                break;
        }
    }
    
    randomize() {
        const categories = ['background', 'body', 'eyes', 'accessories'];
        const traits = {
            background: ['blue', 'red', 'green', 'purple'],
            body: ['circle', 'square', 'triangle', 'hexagon'],
            eyes: ['normal', 'sleepy', 'wink', 'laser'],
            accessories: ['none', 'hat', 'glasses', 'crown']
        };
        
        categories.forEach(category => {
            const availableTraits = traits[category];
            const randomTrait = availableTraits[Math.floor(Math.random() * availableTraits.length)];
            
            // Update UI
            const traitOptions = document.querySelector(`[data-category="${category}"]`);
            traitOptions.querySelectorAll('.trait-option').forEach(opt => {
                opt.classList.remove('selected');
                if (opt.dataset.trait === randomTrait) {
                    opt.classList.add('selected');
                }
            });
            
            // Update traits
            this.currentTraits[category] = randomTrait;
        });
        
        this.drawNFT();
    }
    
    clearAll() {
        // Clear selections
        document.querySelectorAll('.trait-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Clear traits
        Object.keys(this.currentTraits).forEach(key => {
            this.currentTraits[key] = null;
        });
        
        this.clearCanvas();
    }
    
    downloadNFT() {
        const link = document.createElement('a');
        link.download = `nft-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }
    
    generateBatch(count) {
        for (let i = 0; i < count; i++) {
            this.randomize();
            this.addToGallery();
        }
    }
    
    addToGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // Scale down the main canvas to gallery size
        ctx.drawImage(this.canvas, 0, 0, 200, 200);
        
        galleryItem.appendChild(canvas);
        galleryGrid.appendChild(galleryItem);
        
        // Store in gallery array
        this.gallery.push({
            canvas: canvas,
            traits: { ...this.currentTraits }
        });
    }
    
    clearGallery() {
        document.getElementById('galleryGrid').innerHTML = '';
        this.gallery = [];
    }
    
    exportAll() {
        if (this.gallery.length === 0) {
            alert('No NFTs in gallery to export!');
            return;
        }
        
        // Create a simple export (in a real app, you'd use JSZip)
        this.gallery.forEach((item, index) => {
            const link = document.createElement('a');
            link.download = `nft-collection-${index + 1}.png`;
            link.href = item.canvas.toDataURL();
            link.click();
        });
    }
    
    exportMetadata() {
        const metadata = {
            collection: 'NFT Assembler Collection',
            totalSupply: this.gallery.length,
            traits: this.gallery.map((item, index) => ({
                tokenId: index + 1,
                traits: item.traits
            }))
        };
        
        const dataStr = JSON.stringify(metadata, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.download = 'collection-metadata.json';
        link.href = url;
        link.click();
    }
}

// Initialize the NFT Assembler when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NFTAssembler();
});