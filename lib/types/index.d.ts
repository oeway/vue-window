import MyWindow from "./window/index.vue";
import { StyleBlack, StyleWhite, StyleMetal, StyleFactory } from './style';
import Vue from 'vue';
export { WindowResizeEvent, fixPosition } from "./window/script";
export { StyleBlack, StyleWhite, StyleMetal, StyleFactory };
export declare function install(vue: typeof Vue, options?: {
    prefix: string;
}): void;
export { windows } from "./windows";
export declare const WindowType: typeof MyWindow;
