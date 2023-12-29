import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        thumbImg?: string | undefined;
        altTag?: string | undefined;
        titleLink?: string | undefined;
        id: number;
        thumbWidth?: number | undefined;
        selected?: boolean | undefined;
        thumbClass?: string | undefined;
        thumbBtnClass?: string | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ThumbnailProps = typeof __propDef.props;
export type ThumbnailEvents = typeof __propDef.events;
export type ThumbnailSlots = typeof __propDef.slots;
/**
 * [Go to docs](https://flowbite-svelte.com/)
 * ## Props
 * @prop export let thumbImg: string = '';
 * @prop export let altTag: string = '';
 * @prop export let titleLink: string = '';
 * @prop export let id: number;
 * @prop export let thumbWidth: number = 100;
 * @prop export let selected: boolean = false;
 * @prop export let thumbClass: string = '';
 * @prop export let thumbBtnClass: string = '';
 */
export default class Thumbnail extends SvelteComponentTyped<ThumbnailProps, ThumbnailEvents, ThumbnailSlots> {
}
export {};
//# sourceMappingURL=Thumbnail.svelte.d.ts.map