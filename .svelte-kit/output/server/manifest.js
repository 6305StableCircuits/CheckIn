export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.7c31659d.js","app":"_app/immutable/entry/app.1d74b223.js","imports":["_app/immutable/entry/start.7c31659d.js","_app/immutable/chunks/scheduler.e3f9b2bc.js","_app/immutable/chunks/singletons.36a13782.js","_app/immutable/chunks/index.fd035dfc.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/entry/app.1d74b223.js","_app/immutable/chunks/scheduler.e3f9b2bc.js","_app/immutable/chunks/index.6579c2a1.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/adminView",
				pattern: /^\/adminView\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/adminView/[student]",
				pattern: /^\/adminView\/([^/]+?)\/?$/,
				params: [{"name":"student","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
