import { BrowserWindow as BW, BrowserWindowConstructorOptions as BWOpts, screen, Display, WebContents } from 'electron';
import { isNumber, assign, isDef } from '@pokemonon/knife';

/**
 * 获取外部扩展屏
 * @returns 
 */
export function getExternalDisplays() {
    const displays = screen.getAllDisplays();
    return displays.filter(i => i.bounds.x !== 0 && i.bounds.y !== 0);
}

type DisplayOrNum = Display | number;
export interface BrowserWindowConstructorOptions extends BWOpts {
    display?: DisplayOrNum;
}

export interface SetBoundsInDisOpts {
    display?: DisplayOrNum;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    center?: boolean;
}
export class BrowserWindow extends BW {
    static #windowMap = new Map<number, BrowserWindow>()
    static fromWebContents(webContents: WebContents) {
        const win = BW.fromWebContents(webContents);
        return win ? BrowserWindow.#windowMap.get(win.id)! : null;
    }

    display!: Display;
    constructor(private opts: BrowserWindowConstructorOptions) {
        super(opts);

        const { display, center = true, x, y } = opts;
        this.setBoundsInDis({
            display,
            center,
            x,
            y,
        });

        BrowserWindow.#windowMap.set(this.id, this);
    }

    setDisplay(display: DisplayOrNum = 0) {
        if (isNumber(display)) {
            const displays = screen.getAllDisplays();
            display = displays[display < displays.length ? display : 0];
        }
        this.display = display;
        return display;
    }

    // setDisplay(display: DisplayOrNum): void
    // setDisplay()
    // setDisplay(display: DisplayOrNum = 0, center = true) {
    //     const { x = 0, y = 0 } = this.opts;

    //     const dp = this.display = this.getDisplay(display);
    //     console.log(dp.bounds);
    //     // if (center) {
    //     //     this.setBounds(this.getCenterBounds(dp));
    //     // } else {
    //     //     const { bounds: { x: boundX, y: boundY } } = dp;
    //     //     this.setPosition(x + boundX, y + boundY);
    //     // }
    //     this.setBoundsInDis({
    //         display: dp,
    //         center,
    //     })
    //     return dp;
    // }

    getCenterBounds(display?: DisplayOrNum) {
        const dp = this.setDisplay(display);
        const { width: winW, height: winH } = this.getBounds();
        const {
            x: displayX,
            y: displayY,
            width: displayW,
            height: displayH,
        } = dp.bounds;
        return {
            x: displayX + (displayW - winW) / 2,
            y: displayY + (displayH - winH) / 2,
            width: winW,
            height: winH,
            displayX,
            displayY,
        };
    }

    setBoundsInDis(opts: SetBoundsInDisOpts) {
        const {
            x: originalX,
            y: originalY,
            width: originalW,
            height: originalH,
        } = this.getBounds();
        const { display: originalDisplay } = this.opts;
        const { display = originalDisplay, x, y, center = true, width = originalW, height = originalH } = opts;
        const dp = this.setDisplay(display);
        const {
            x: centerX,
            y: centerY,
            displayX,
            displayY,
        } = this.getCenterBounds(dp);
        this.setBounds({
            x: isNumber(x) ? displayX + x : center ? centerX : originalX,
            y: isNumber(y) ? displayY + y : center ? centerY : originalY, 
            width,
            height,
        });
    }
}
