<script lang="ts">
    import { Student } from "$lib/classes/Student";
    import {
        createColumnHelper,
        createSvelteTable,
        flexRender,
        getCoreRowModel,
        type ColumnSort,
        type TableOptions,
        type TableState,
        getSortedRowModel,
        getFilteredRowModel,
    } from "@tanstack/svelte-table";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";

    export let data: import("./$types").PageData;

    let globalFilter = "";

    function setGlobalFilter(filter: string) {
        globalFilter = filter;
        options.update((old) => {
            return {
                ...old,
                state: {
                    ...old.state,
                    globalFilter: filter,
                },
            };
        });
    }

    type Student = {
        name: string;
        id: number;
        shopHours: number;
    };

    const columnHelper = createColumnHelper<Student>();

    const columns = [
        columnHelper.accessor("name", {
            header: () => "Name",
            footer: (props) => props.column.id,
            enableGlobalFilter: true,
        }),
        columnHelper.accessor("id", {
            header: () => "ID",
            footer: (props) => props.column.id,
            enableGlobalFilter: true,
        }),
        columnHelper.accessor("shopHours", {
            header: () => "Hours",
            cell: (val) => val.getValue().toFixed(2),
            footer: (props) => props.column.id,
            enableGlobalFilter: false,
        }),
    ];

    let sorting: ColumnSort[] = [{ desc: true, id: "shopHours" }];

    const setSorting = (
        updater: ColumnSort[] | ((arg0: ColumnSort[]) => ColumnSort[])
    ) => {
        if (updater instanceof Function) {
            sorting = updater(sorting);
        } else {
            sorting = updater;
        }
        options.update((old) => ({
            ...old,
            state: {
                ...old.state,
                sorting,
            },
        }));
    };

    const options = writable<TableOptions<Student>>({
        data: data.students,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    const table = createSvelteTable(options);

    const carets: Record<string, string> = {
        asc: " ▲",
        desc: " ▼",
    };

    function handleSearch(e: Event) {
        const target = e.target as HTMLInputElement;
        setGlobalFilter(target.value);
    }
</script>

<div class="bg-slate-900 h-screen">
    <Navbar route1="/" svg1="M15.75 19.5 8.25 12l7.5-7.5" text="Data View" route2="/adminView" svg2="M12 4.5v15m7.5-7.5h-15" />
    <div class="w-full mx-auto h-3/4 overflow-scroll">
        <div class="relative flex items-center mx-auto md:w-1/2 w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div class="grid place-items-center mx-3xs h-full min-w-min text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"fill="none"viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input bind:value={globalFilter} on:keyup={handleSearch} class="peer h-full w-full outline-none text-lg text-gray-700 pr-2" placeholder="Enter Name or ID Number" id="searchBar" autocomplete="off" data-search/>
        </div>
        <table class="w-full text-xl mt-lg">
            <thead>
                {#each $table.getHeaderGroups() as headerGroup}
                    <tr>
                        {#each headerGroup.headers as header}
                            <th
                                colSpan={header.colSpan}
                                class="border border-slate-800 text-center bg-slate-400 hover:bg-slate-500"
                            >
                                {#if !header.isPlaceholder}
                                    <button
                                        class:cursor-pointer={header.column.getCanSort()}
                                        class:select-none={header.column.getCanSort()}
                                        on:click={header.column.getToggleSortingHandler()}
                                        on:keypress={header.column.getToggleSortingHandler()}
                                        class="w-full h-full flex items-center justify-center"
                                    >
                                        <svelte:component
                                            this={flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        />
                                        <span class="text-base ml-3"
                                            >{carets[
                                                header.column
                                                    .getIsSorted()
                                                    .toString()
                                            ] ?? ""}</span
                                        >
                                    </button>
                                {/if}
                            </th>
                        {/each}
                    </tr>
                {/each}
            </thead>
            <tbody
                class="[&>*:nth-child(odd)]:bg-slate-200 [&>*:nth-child(even)]:bg-white"
            >
                {#each $table.getRowModel().rows as row}
                    <tr
                        class="hover:!bg-slate-300 w-full hover:cursor-pointer"
                        on:click={async () => {
                            await goto("/adminView/" + row.original.id);
                        }}
                    >
                        {#each row.getVisibleCells() as cell}
                            <td class="border border-slate-800 text-center">
                                <svelte:component
                                    this={flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                />
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
