

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7fbc7617.js","_app/immutable/chunks/scheduler.e3f9b2bc.js","_app/immutable/chunks/index.6579c2a1.js","_app/immutable/chunks/singletons.36a13782.js","_app/immutable/chunks/index.fd035dfc.js"];
export const stylesheets = [];
export const fonts = [];
