<script lang="ts">
    let { marcaModel } = $props();
    let id = $props.id();
</script>

{#if marcaModel.createDialog}
    <div
        class="w-full text-black h-full fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="bg-white rounded-md p-4 w-96">
            <form onsubmit={(e) => marcaModel.createMarca(e)}>
                <h2 class="text-lg font-bold">Crear Marca</h2>

                <div class="p-2 flex flex-col">
                    <label for="name" class="block text-sm font-bold"
                        >Nombre</label
                    >
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        placeholder="Ingrese el nombre"
                        type="text"
                        id={`name-${id}`}
                        name="name"
                    />

                    {#if marcaModel.messageError?.name}
                        <p class="text-red-600">{marcaModel.messageError.name}</p>
                    {/if}
                    
                </div>
        
                <div class="p-2 flex flex-col">
                    <label for="description" class="block text-sm font-bold"
                        >Descripción</label
                    >
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        placeholder="Ingrese la descripción"
                        type="text"
                        id={`description-${id}`}
                        name="description"
                    />

                    {#if marcaModel.messageError?.description}
                        <p class="text-red-600">{marcaModel.messageError.description}</p>
                    {/if}
                </div>

                <div class="p-2 flex justify-end gap-2 mt-3">
                    <button
                        class="bg-red-400 text-white px-4 py-2 rounded-md"
                        onclick={() => (marcaModel.createDialog = false)}
                    >
                        Cancelar
                    </button>
                    <button
                        class="bg-blue-400 text-white px-4 py-2 rounded-md"
                        type="submit"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}