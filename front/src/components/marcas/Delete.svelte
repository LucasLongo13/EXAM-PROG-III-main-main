<script lang="ts">
    let { marcaModel } = $props();
</script>

{#if marcaModel.deleteDialog}
    <dialog
        open={marcaModel.deleteDialog}
        class="w-full h-full fixed top-0 left-0 flex items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="bg-white p-4 rounded-md w-96">
            <button
                aria-label="Cerrar"
                class="close"
                onclick={() => (marcaModel.deleteDialog = false)}>X</button
            >
            <div class="p-4">
                <h2 class="text-lg font-bold">
                    Desea eliminar la marca {marcaModel.marca.name}?
                </h2>
            </div>
            <div class="p-2 flex justify-end gap-2 mt-3">
                <button
                    class="bg-red-400 text-white px-4 py-2 rounded-md"
                    onclick={() => (marcaModel.deleteDialog = false)}
                >
                    Cancelar
                </button>
                <button
                    class="bg-blue-400 text-white px-4 py-2 rounded-md"
                    onclick={() => marcaModel.deleteMarca(marcaModel.marca.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    </dialog>
{/if}