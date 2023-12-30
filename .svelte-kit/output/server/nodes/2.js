import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.2d3563cd.js","_app/immutable/chunks/Student.85f26ea6.js","_app/immutable/chunks/firebase.e814b12e.js","_app/immutable/chunks/index.fd035dfc.js","_app/immutable/chunks/scheduler.e3f9b2bc.js","_app/immutable/chunks/index.6579c2a1.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
