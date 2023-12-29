import { SvelteComponentTyped } from "svelte";
import type { TransitionTypes, TransitionParamTypes } from '../types';
declare const __propDef: {
    props: {
        [x: string]: any;
        id?: string | undefined;
        showIndicators?: boolean | undefined;
        showCaptions?: boolean | undefined;
        showThumbs?: boolean | undefined;
        images: any[];
        slideControls?: boolean | undefined;
        transitionType?: TransitionTypes | undefined;
        transitionParams?: TransitionParamTypes | undefined;
        loop?: boolean | undefined;
        duration?: number | undefined;
        divClass?: string | undefined;
        indicatorDivClass?: string | undefined;
        captionClass?: string | undefined;
        indicatorClass?: string | undefined;
        slideClass?: string | undefined;
        transitionDivClass?: string | undefined;
        imgFit?: "none" | "cover" | "contain" | "fill" | "scale-down" | undefined;
        imgClass?: string | undefined;
        thumbClass?: string | undefined;
        thumbDivClass?: string | undefined;
        thumbBtnClass?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        previous: {};
        next: {};
    };
};
export type CarouselTransitionProps = typeof __propDef.props;
export type CarouselTransitionEvents = typeof __propDef.events;
export type CarouselTransitionSlots = typeof __propDef.slots;
/**
 * [Go to docs](https://flowbite-svelte.com/)
 * ## Props
 * @prop export let id: string = 'default-transition-carousel';
 * @prop export let showIndicators: boolean = true;
 * @prop export let showCaptions: boolean = true;
 * @prop export let showThumbs: boolean = true;
 * @prop export let images: any[];
 * @prop export let slideControls: boolean = true;
 * @prop export let transitionType: TransitionTypes = 'fade';
 * @prop export let transitionParams: TransitionParamTypes = {};
 * @prop export let loop: boolean = false;
 * @prop export let duration: number = 2000;
 * @prop export let divClass: string = 'overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96';
 * @prop export let indicatorDivClass: string = 'flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2';
 * @prop export let captionClass: string = 'h-10 bg-gray-300 dark:bg-gray-700 dark:text-white p-2 my-2 text-center';
 * @prop export let indicatorClass: string = 'w-3 h-3 rounded-full bg-gray-100 hover:bg-gray-300 opacity-60';
 * @prop export let slideClass: string = '';
 * @prop export let transitionDivClass: string = 'h-full w-full';
 * @prop export let imgFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' = 'cover';
 * @prop export let imgClass: string = `object-${imgFit} ${imgFit === 'cover' && 'w-full'} h-full`;
 * @prop export let thumbClass: string = 'opacity-40';
 * @prop export let thumbDivClass: string = 'flex flex-row justify-center bg-gray-100 w-full';
 * @prop export let thumbBtnClass: string = '';
 * @prop export let slideClass: string = 'hidden';
 */
export default class CarouselTransition extends SvelteComponentTyped<CarouselTransitionProps, CarouselTransitionEvents, CarouselTransitionSlots> {
}
export {};
//# sourceMappingURL=CarouselTransition.svelte.d.ts.map