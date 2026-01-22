/// <reference types="pixi.js" />

import * as PIXI from 'pixi.js';
import { FX } from "./FX";

export class MovieClip extends PIXI.AnimatedSprite {

    public componentId: string;
    public __sequenceEndTime: number;
    public __fx: FX;

    get currentFrame(): number {
        return this._currentFrame;
    }
    set currentFrame(value: number) {
        this._currentFrame = value;
    }

    private _currentFrame: number = 0;

    constructor(componentId: string, textures: string[], anchorX?: number, anchorY?: number) {
        let t = <PIXI.Texture[]>[];
        let l = textures.length;

        for (let i = 0; i < l; i++) {
            t.push(PIXI.Texture.from(textures[i]));
        }

        if (t.length === 0) {
            // Create empty texture to prevent crash
            t.push(PIXI.Texture.EMPTY);
        }

        super(t);

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
    public update(deltaTime: number): void {
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

    public recycle() {
        this.alpha = 1;
        this.tint = 0xffffff;
        this.rotation = 0;
        this.scale.set(1);
        if (this.parent) this.parent.removeChild(this);
        this.gotoAndStop(0);
        this.__fx.__recycleMovieClip(this.componentId, this);
    }

    public dispose() {
        if (this.parent) this.parent.removeChild(this);
        this.gotoAndStop(0);
        this.destroy();
    }

    // *********************************************************************************************
    // * Private																				   *
    // *********************************************************************************************

    // *********************************************************************************************
    // * Events																		               *
    // *********************************************************************************************

}
