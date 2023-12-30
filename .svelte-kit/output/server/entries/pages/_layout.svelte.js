import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { u as userState } from "../../chunks/firebase.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="h-screen u-container mx-auto w-full">${userState === void 0 ? `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}` : `${!userState ? `${validate_component(Login, "Login").$$render($$result, {}, {}, {})}` : `${slots.default ? slots.default({}) : ``}`}`}</div>`;
});
export {
  Layout as default
};
