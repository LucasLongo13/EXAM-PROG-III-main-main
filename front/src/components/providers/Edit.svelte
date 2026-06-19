<script lang="ts">
    let { providerModel } = $props();
    let id = $props.id();
</script>

{#if providerModel.editDialog}
<div class="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50">
    <div class="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-4 rounded-md w-96 shadow-lg">
        <form onsubmit={(e) => providerModel.editSupplier(providerModel.supplier.id, e)}>
            <h2 class="text-lg font-bold">Editar Proveedor</h2>
            <hr />

            <div class="p-2 flex flex-col">
                <label for="name" class="font-bold">Nombre:</label>
                <input id="name" class="border p-2 rounded-md bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100 placeholder:text-slate-400" name="name" value={providerModel.supplier.name} required />
                {#if providerModel.fieldErrors?.name}
                <span class="text-sm text-red-500 mt-1">{providerModel.fieldErrors.name}</span>
                {/if}
            </div>

            <div class="p-2 flex flex-col">
                <label for="email" class="font-bold">Email:</label>
                <input id="email" type="email" class="border p-2 rounded-md bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100 placeholder:text-slate-400" name="email" value={providerModel.supplier.email ?? ""} />
                {#if providerModel.fieldErrors?.email}
                <span class="text-sm text-red-500 mt-1">{providerModel.fieldErrors.email}</span>
                {/if}
            </div>

            <div class="p-2 flex flex-col">
                <label for="phone" class="font-bold">Teléfono:</label>
                <input id="phone" type="tel" inputmode="numeric" pattern="[0-9]*" class="border p-2 rounded-md bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100 placeholder:text-slate-400" name="phone" value={providerModel.supplier.phone ?? ""} oninput={(e) => (e as Event & { currentTarget: HTMLInputElement }).currentTarget.value = String((e as Event & { currentTarget: HTMLInputElement }).currentTarget.value).replace(/\D/g, '')} />
                {#if providerModel.fieldErrors?.phone}
                <span class="text-sm text-red-500 mt-1">{providerModel.fieldErrors.phone}</span>
                {/if}
            </div>

            <div class="flex justify-end gap-2 mt-3">
                <button type="button" class="bg-red-400 text-white px-4 py-2 rounded-md"
                    onclick={() => providerModel.editDialog = false}>
                    Cancelar
                </button>

                <button type="submit" class="bg-blue-400 text-white px-4 py-2 rounded-md">
                    Guardar
                </button>
            </div>
        </form>
    </div>
</div>
{/if}
