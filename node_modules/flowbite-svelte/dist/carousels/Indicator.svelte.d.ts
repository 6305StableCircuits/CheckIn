import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        name?: string | undefined;
        selected?: boolean | undefined;
        indicatorClass?: string | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IndicatorProps = typeof __propDef.props;
export type IndicatorEvents = typeof __propDef.events;
export type IndicatorSlots = typeof __propDef.slots;
/**
 * [Go to docs](https://flowbite-svelte.com/)
 * ## Props
 * @prop export let name: string = '';
 * @prop export let selected: boolean = false;
 * @prop export let indicatorClass: string = '';
 */
export default class Indicator extends SvelteComponentTyped<IndicatorProps, IndicatorEvents, IndicatorSlots> {
}
export {};
//# sourceMappingURL=Indicator.svelte.d.ts.map