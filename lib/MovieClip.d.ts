import * as PIXI from 'pixi.js';
import { FX } from "./FX";
export declare class MovieClip extends PIXI.AnimatedSprite {
    componentId: string;
    __sequenceEndTime: number;
    __fx: FX;
    get currentFrame(): number;
    set currentFrame(value: number);
    private _currentFrame;
    constructor(componentId: string, textures: string[], anchorX?: number, anchorY?: number);
    /**
     * Override update to validate currentFrame and prevent crashes
     */
    update(deltaTime: number): void;
    recycle(): void;
    dispose(): void;
}
//# sourceMappingURL=MovieClip.d.ts.map