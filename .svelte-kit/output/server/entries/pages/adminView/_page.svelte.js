import { r as run_all, n as noop, b as blank_object, i as is_function, a as is_empty, c as run, g as get_store_value, d as safe_not_equal, s as subscribe } from "../../../chunks/utils.js";
import { d as set_current_component, f as current_component, h as children, i as detach, j as start_hydrating, k as end_hydrating, c as create_ssr_component, v as validate_component, e as escape, t as text, l as claim_text, n as insert_hydration, o as set_data, a as add_attribute, b as each, m as missing_component } from "../../../chunks/ssr.js";
import "../../../chunks/firebase.js";
import "firebase/firestore";
import { createTable, createColumnHelper, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/table-core";
import { r as readable, w as writable, d as derived } from "../../../chunks/index2.js";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
function create_component(block) {
  block && block.c();
}
function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$ = void 0;
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$set = void 0;
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
/**
 * svelte-table
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function create_fragment$1(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*content*/
        ctx[0]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*content*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*content*/
      1)
        set_data(
          t,
          /*content*/
          ctx2[0]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { content } = $$props;
  $$self.$$set = ($$props2) => {
    if ("content" in $$props2)
      $$invalidate(0, content = $$props2.content);
  };
  return [content];
}
class Placeholder$1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, { content: 0 });
  }
}
const PlaceholderServer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${escape($$props.content)}`;
});
var Placeholder = typeof document === "undefined" ? PlaceholderServer : Placeholder$1;
function create_fragment(ctx, Comp, props) {
  let c;
  let current;
  c = new Comp({
    props,
    $$inline: true
  });
  return {
    c() {
      create_component(c.$$.fragment);
    },
    l(nodes) {
      claim_component(c.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(c, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(c.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(c.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(c, detaching);
    }
  };
}
function renderClient(Comp, props) {
  return class WrapperComp extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, (ctx) => create_fragment(ctx, Comp, props), safe_not_equal, {}, void 0);
    }
  };
}
function renderServer(Comp, props) {
  const WrapperComp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    return `${validate_component(Comp, "TableComponent").$$render($$result, props, {}, {})}`;
  });
  return WrapperComp;
}
const renderComponent = typeof window === "undefined" ? renderServer : renderClient;
function isSvelteServerComponent(component) {
  return typeof component === "object" && typeof component.$$render === "function" && typeof component.render === "function";
}
function isSvelteClientComponent(component) {
  var _component$name, _component$name2;
  let isHMR = "__SVELTE_HMR" in window;
  return component.prototype instanceof SvelteComponent || isHMR && ((_component$name = component.name) == null ? void 0 : _component$name.startsWith("Proxy<")) && ((_component$name2 = component.name) == null ? void 0 : _component$name2.endsWith(">"));
}
function isSvelteComponent(component) {
  if (typeof document === "undefined") {
    return isSvelteServerComponent(component);
  } else {
    return isSvelteClientComponent(component);
  }
}
function wrapInPlaceholder(content) {
  return renderComponent(Placeholder, {
    content
  });
}
function flexRender(component, props) {
  if (!component)
    return null;
  if (isSvelteComponent(component)) {
    return renderComponent(component, props);
  }
  if (typeof component === "function") {
    const result = component(props);
    if (result === null || result === void 0)
      return null;
    if (isSvelteComponent(result)) {
      return renderComponent(result, props);
    }
    return wrapInPlaceholder(result);
  }
  return wrapInPlaceholder(component);
}
function createSvelteTable(options) {
  let optionsStore;
  if ("subscribe" in options) {
    optionsStore = options;
  } else {
    optionsStore = readable(options);
  }
  let resolvedOptions = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...get_store_value(optionsStore)
  };
  let table = createTable(resolvedOptions);
  let stateStore = writable(
    /** @type {number} */
    table.initialState
  );
  let stateOptionsStore = derived([stateStore, optionsStore], (s) => s);
  const tableReadable = readable(table, function start(set) {
    const unsubscribe = stateOptionsStore.subscribe((_ref) => {
      let [state, options2] = _ref;
      table.setOptions((prev) => {
        return {
          ...prev,
          ...options2,
          state: {
            ...state,
            ...options2.state
          },
          // Similarly, we'll maintain both our internal state and any user-provided
          // state.
          onStateChange: (updater) => {
            if (updater instanceof Function) {
              stateStore.update(updater);
            } else {
              stateStore.set(updater);
            }
            resolvedOptions.onStateChange == null || resolvedOptions.onStateChange(updater);
          }
        };
      });
      set(table);
    });
    return function stop() {
      unsubscribe();
    };
  });
  return tableReadable;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $table, $$unsubscribe_table;
  let { data } = $$props;
  let globalFilter = "";
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: () => "Name",
      footer: (props) => props.column.id,
      enableGlobalFilter: true
    }),
    columnHelper.accessor("id", {
      header: () => "ID",
      footer: (props) => props.column.id,
      enableGlobalFilter: true
    }),
    columnHelper.accessor("shopHours", {
      header: () => "Hours",
      cell: (val) => val.getValue().toFixed(2),
      footer: (props) => props.column.id,
      enableGlobalFilter: false
    })
  ];
  let sorting = [{ desc: true, id: "shopHours" }];
  const setSorting = (updater) => {
    if (updater instanceof Function) {
      sorting = updater(sorting);
    } else {
      sorting = updater;
    }
    options.update((old) => ({ ...old, state: { ...old.state, sorting } }));
  };
  const options = writable({
    data: data.students,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  });
  const table = createSvelteTable(options);
  $$unsubscribe_table = subscribe(table, (value) => $table = value);
  const carets = { asc: " ▲", desc: " ▼" };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_table();
  return `<div class="bg-blue-300 h-screen"><div class="flex" data-svelte-h="svelte-1l3mxkt"><a href="/" class="text-white font-bold flex text-left mt-12 text-8xl hover:bg-[#00000033] rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-2xl-3xl"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg></a> <h1 class="text-white font-bold flex text-center mx-auto pt-12 text-8xl">Data View</h1> <a href="/adminView" class="text-white font-bold flex text-left mt-12 text-8xl hover:bg-[#00000033] rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-2xl-3xl"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg></a></div> <div class="sm:w-2/3 w-full my-3xs-2xs p-md-lg mx-auto bg-slate-900 h-3/4 rounded-lg overflow-scroll"><div class="relative flex items-center mx-auto md:w-2/3 w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"><div class="grid place-items-center mx-3xs h-full min-w-min text-gray-300" data-svelte-h="svelte-k26qms"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <input class="peer h-full w-full outline-none text-sm text-gray-700 pr-2" placeholder="Enter Name or ID Number" id="searchBar" autocomplete="off" data-search${add_attribute("value", globalFilter, 0)}></div> <table class="w-full text-white text-xl mt-md"><thead>${each($table.getHeaderGroups(), (headerGroup) => {
    return `<tr>${each(headerGroup.headers, (header) => {
      return `<th${add_attribute("colspan", header.colSpan, 0)} class="border border-white text-center bg-slate-600 hover:bg-slate-700">${!header.isPlaceholder ? `<button class="${[
        "w-full h-full flex items-center justify-center",
        (header.column.getCanSort() ? "cursor-pointer" : "") + " " + (header.column.getCanSort() ? "select-none" : "")
      ].join(" ").trim()}">${validate_component(flexRender(header.column.columnDef.header, header.getContext()) || missing_component, "svelte:component").$$render($$result, {}, {}, {})} <span class="text-base ml-3">${escape(carets[header.column.getIsSorted().toString()] ?? "")}</span> </button>` : ``} </th>`;
    })} </tr>`;
  })}</thead> <tbody class="[&>*:nth-child(odd)]:bg-slate-800 [&>*:nth-child(even)]:bg-slate-700">${each($table.getRowModel().rows, (row) => {
    return `<tr class="hover:!bg-slate-900 w-full hover:cursor-pointer">${each(row.getVisibleCells(), (cell) => {
      return `<td class="border border-white text-center">${validate_component(flexRender(cell.column.columnDef.cell, cell.getContext()) || missing_component, "svelte:component").$$render($$result, {}, {}, {})} </td>`;
    })} </tr>`;
  })}</tbody></table></div></div>`;
});
export {
  Page as default
};
