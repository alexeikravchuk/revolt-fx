/// <reference types="pixi.js" />
import * as PIXI from 'pixi.js';
export class MovieClip extends PIXI.AnimatedSprite {
    get currentFrame() {
        return this._currentFrame;
    }
    set currentFrame(value) {
        this._currentFrame = value;
    }
    constructor(componentId, textures, anchorX, anchorY) {
        let t = [];
        let l = textures.length;
        for (let i = 0; i < l; i++) {
            t.push(PIXI.Texture.from(textures[i]));
        }
        if (t.length === 0) {
            // Create empty texture to prevent crash
            t.push(PIXI.Texture.EMPTY);
        }
        super(t);
        this._currentFrame = 0;
        this.componentId = componentId;
        this.anchor.set(anchorX !== undefined ? anchorX : 0.5, anchorY !== undefined ? anchorY : 0.5);
        this.loop = false;
        this.animationSpeed = 1; // Ensure default animation speed is set
        this.currentFrame = 0; // Explicitly set starting frame
        this.__sequenceEndTime = 0;
    }
    // *********************************************************************************************
    // * Public																		                                        			   *
    // *********************************************************************************************
    /**
     * Override update to validate currentFrame and prevent crashes
     */
    update(deltaTime) {
        // Check for NaN currentFrame before accessing texture
        if (isNaN(this.currentFrame)) {
            // Reset to frame 0 and stop
            this.currentFrame = 0;
            this.stop();
            return;
        }
        const currentTexture = this.textures[this.currentFrame];
        if (!currentTexture) {
            // Stop animation to prevent crash
            this.stop();
            return;
        }
        super.update(deltaTime);
    }
    recycle() {
        this.alpha = 1;
        this.tint = 0xffffff;
        this.rotation = 0;
        this.scale.set(1);
        if (this.parent)
            this.parent.removeChild(this);
        this.gotoAndStop(0);
        this.__fx.__recycleMovieClip(this.componentId, this);
    }
    dispose() {
        if (this.parent)
            this.parent.removeChild(this);
        this.gotoAndStop(0);
        this.destroy();
    }
}
//# sourceMappingURL=MovieClip.js.map