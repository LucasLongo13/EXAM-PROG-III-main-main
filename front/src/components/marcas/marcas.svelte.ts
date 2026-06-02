import { http } from "@core/http"

interface Marca {
    id: number
    name: string
    description: string

}

class MarcaModel {
    marca = $state<Marca | null>(null)
    marcas = $state<Marca[]>([])
    deleteDialog = $state(false);
    editDialog = $state(false);
    createDialog = $state(false);
    messageError = $state({ name: '', description: '' });

    async getMarcas() {
        this.marcas = await http.get<Marca[]>(`${import.meta.env.PUBLIC_API_URL}/marcas`);
    }

    async deleteMarca(id: number) {
        await http.delete<Marca>(`${import.meta.env.PUBLIC_API_URL}/marcas/${id}`);
        this.getMarcas();
        this.deleteDialog = false;
    }

    async editMarca(id: number, e: Event) {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);

            await http.patch<Marca>(`${import.meta.env.PUBLIC_API_URL}/marcas/${id}`, data);
            this.getMarcas();
            this.editDialog = false;
        } catch (error: any) {
            this.messageError = error
        }
    }

    async createMarca(e: Event) {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);

            await http.post<Marca>(`${import.meta.env.PUBLIC_API_URL}/marcas`, data);
            this.getMarcas();
            this.createDialog = false;
        } catch (error: any) {
            this.messageError = error
        }
    }

    showCreateModal() {
        this.marca = null;
        this.createDialog = true;
        this.messageError = { name: '', description: '' }
    }

    showEditModal(marca: Marca) {
        this.marca = marca;
        this.editDialog = true;
    }

    showDeleteModal(marca: Marca) {
        this.marca = marca;
        this.deleteDialog = true;
    }
}

export const marcaModel = new MarcaModel();