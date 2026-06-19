    <script lang="ts">
    let { providerModel } = $props();
</script>

{#if providerModel.deleteDialog}
<dialog open class="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50">
    <div class="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-4 rounded-md w-96 shadow-lg">
        <h2 class="text-lg font-bold">
            ¿Eliminar proveedor {providerModel.supplier.name}?
        </h2>

        <div class="flex justify-end gap-2 mt-3">
            <button class="bg-red-400 text-white px-4 py-2 rounded-md"
                onclick={() => providerModel.deleteDialog = false}>
                Cancelar
            </button>

            <button class="bg-blue-400 text-white px-4 py-2 rounded-md"
                onclick={() => providerModel.deleteSupplier(providerModel.supplier.id)}>
                Eliminar
            </button>
        </div>
    </div>
</dialog>
{/if}
