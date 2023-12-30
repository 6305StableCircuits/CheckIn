import * as universal from '../entries/pages/adminView/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/adminView/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/adminView/+page.ts";
export const imports = ["_app/immutable/nodes/3.1883230e.js","_app/immutable/chunks/firebase.e814b12e.js","_app/immutable/chunks/index.fd035dfc.js","_app/immutable/chunks/scheduler.e3f9b2bc.js","_app/immutable/chunks/index.6579c2a1.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/singletons.36a13782.js"];
export const stylesheets = [];
export const fonts = [];
