<script lang="ts">
    import { providerModel } from "./providers.svelte";
    import Create from "./Create.svelte";
    import Edit from "./Edit.svelte";
    import Delete from "./Delete.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        await providerModel.getSuppliers();
    });
</script>

<Create {providerModel} />
<Edit {providerModel} />
<Delete {providerModel} />

<div class="w-full flex justify-end mb-4">
    <button class="bg-gray-800 text-white px-4 py-2 rounded-md"
        on:click={() => providerModel.showCreateModal()}>
        Nuevo Proveedor
    </button>
</div>

{#if providerModel.errorMessage}
<div class="bg-red-200 text-red-800 p-2 rounded-md mb-4">
    {providerModel.errorMessage}
</div>
{/if}

<table class="w-full table-auto">
    <thead>
        <tr>
            <th class="bg-gray-800 text-white p-2 text-left">Nombre</th>
            <th class="bg-gray-800 text-white p-2 text-left">Email</th>
            <th class="bg-gray-800 text-white p-2 text-left">Teléfono</th>
            <th class="bg-gray-800 text-white p-2">Acciones</th>
        </tr>
    </thead>

    <tbody>
        {#each providerModel.suppliers as supplier}
        <tr class="odd:bg-gray-100 dark:odd:bg-slate-800 even:bg-white dark:even:bg-slate-900">
            <td class="p-2 text-slate-900 dark:text-slate-100">{supplier.name}</td>
            <td class="p-2 text-slate-900 dark:text-slate-100">{supplier.email}</td>
            <td class="p-2 text-slate-900 dark:text-slate-100">{supplier.phone}</td>
            <td class="p-2">
                <div class="flex justify-center gap-2">
                    <button class="bg-gray-800 text-white px-4 rounded-md"
                        on:click={() => providerModel.showEditModal(supplier)}>
                        Editar
                    </button>

                    <button class="bg-red-500 text-white px-4 rounded-md"
                        on:click={() => providerModel.showDeleteModal(supplier)}>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
        {/each}
    </tbody>
</table>
