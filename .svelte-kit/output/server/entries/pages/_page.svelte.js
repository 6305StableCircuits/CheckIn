import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component, e as escape, a as add_attribute, b as each, v as validate_component } from "../../chunks/ssr.js";
import "../../chunks/firebase.js";
import "firebase/firestore";
import { w as writable } from "../../chunks/index2.js";
const StudentCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { student } = $$props;
  let checkedIn = student.scanTimes.length % 2 != 0;
  if ($$props.student === void 0 && $$bindings.student && student !== void 0)
    $$bindings.student(student);
  return `<div class="bg-white min-w-min p-sm-md rounded-lg w-full"><h1 class="text-2xl">${escape(student.firstName)} ${escape(student.lastName)}</h1> <h2 class="text-xl">ID: ${escape(student.id)}</h2> ${!checkedIn ? `<button class="bg-green-500 p-1 w-full mt-2 flex-row rounded-lg" data-svelte-h="svelte-1gcboqg">Check In</button>` : `${checkedIn ? `<button class="bg-red-600 p-1 w-full mt-2 flex-row rounded-lg" data-svelte-h="svelte-h4zrf1">Check Out</button>` : ``}`}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $students, $$unsubscribe_students;
  let { data } = $$props;
  const students = writable(data.students);
  $$unsubscribe_students = subscribe(students, (value) => $students = value);
  let search = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_students();
  return `<div class="bg-blue-300 h-screen"><div class="flex" data-svelte-h="svelte-12g7eg2"><h1 class="text-white font-bold flex text-center mx-auto pt-12 text-8xl pl-2xl-3xl">Check In</h1> <a href="/adminView" class="text-white font-bold flex text-left mt-12 text-8xl hover:bg-[#00000033] rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-2xl-3xl"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"></path></svg></a></div> <div class="sm:w-2/3 w-full mx-auto my-3xs-2xs p-md-lg bg-slate-900 h-3/4 rounded-lg overflow-scroll"><div class="relative flex items-center mx-auto md:w-2/3 w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"><div class="grid place-items-center mx-3xs h-full min-w-min text-gray-300" data-svelte-h="svelte-1lzoipy"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <input class="peer h-full w-full outline-none text-sm text-gray-700 pr-2" placeholder="Enter Name or ID Number" id="searchBar" autocomplete="off" data-search${add_attribute("value", search, 0)}></div> <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-sm my-sm">${each($students, (student) => {
    return `${student.shown(search.toLowerCase()) ? `${validate_component(StudentCard, "StudentCard").$$render($$result, { student }, {}, {})}` : ``}`;
  })}</div></div></div>`;
});
export {
  Page as default
};
