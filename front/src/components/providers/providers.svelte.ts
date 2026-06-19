import { http } from "@core/http";

interface Supplier {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
}

class ProviderModel {
    supplier = $state<Supplier | null>(null);
    suppliers = $state<Supplier[]>([]);

    createDialog = $state(false);
    editDialog = $state(false);
    deleteDialog = $state(false);

    errorMessage = $state<string | null>(null);
    fieldErrors = $state<Record<string, string | null>>({});

    async getSuppliers() {
        try {
            this.suppliers = await http.get<Supplier[]>(`${import.meta.env.PUBLIC_API_URL}/suppliers`);
        } catch (err: any) {
            this.errorMessage = err?.message ?? "Error al obtener proveedores";
        }
    }

    async createSupplier(e: SubmitEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = {
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim() || undefined,
            phone: String(formData.get("phone") ?? "").trim() || undefined,
        };

        // limpiar errores previos
        this.fieldErrors = {};
        this.errorMessage = null;

        try {
            await http.post(`${import.meta.env.PUBLIC_API_URL}/suppliers`, data);
            await this.getSuppliers();
            this.createDialog = false;
        } catch (err: any) {
            // intentar mapear errores por campo
            const msg = err?.message;
            if (Array.isArray(msg)) {
                // buscar palabras clave
                for (const m of msg) {
                    const lower = String(m).toLowerCase();
                    if (lower.includes('nombre') || lower.includes('nombre')) this.fieldErrors.name = String(m);
                    else if (lower.includes('email')) this.fieldErrors.email = String(m);
                    else if (lower.includes('tel') || lower.includes('telefono') || lower.includes('teléfono') || lower.includes('número')) this.fieldErrors.phone = String(m);
                    else this.errorMessage = (this.errorMessage ? this.errorMessage + ' ' : '') + String(m);
                }
            } else if (typeof msg === 'string') {
                const lower = msg.toLowerCase();
                if (lower.includes('nombre')) this.fieldErrors.name = msg;
                else if (lower.includes('email')) this.fieldErrors.email = msg;
                else if (lower.includes('tel') || lower.includes('telefono') || lower.includes('teléfono') || lower.includes('número')) this.fieldErrors.phone = msg;
                else this.errorMessage = msg;
            } else {
                this.errorMessage = err?.toString() ?? 'Error al crear proveedor';
            }
        }
    }

    async editSupplier(id: number, e: SubmitEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = {
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim() || undefined,
            phone: String(formData.get("phone") ?? "").trim() || undefined,
        };

        this.fieldErrors = {};
        this.errorMessage = null;

        try {
            await http.patch(`${import.meta.env.PUBLIC_API_URL}/suppliers/${id}`, data);
            await this.getSuppliers();
            this.editDialog = false;
        } catch (err: any) {
            const msg = err?.message;
            if (Array.isArray(msg)) {
                for (const m of msg) {
                    const lower = String(m).toLowerCase();
                    if (lower.includes('nombre')) this.fieldErrors.name = String(m);
                    else if (lower.includes('email')) this.fieldErrors.email = String(m);
                    else if (lower.includes('tel') || lower.includes('telefono') || lower.includes('teléfono') || lower.includes('número')) this.fieldErrors.phone = String(m);
                    else this.errorMessage = (this.errorMessage ? this.errorMessage + ' ' : '') + String(m);
                }
            } else if (typeof msg === 'string') {
                const lower = msg.toLowerCase();
                if (lower.includes('nombre')) this.fieldErrors.name = msg;
                else if (lower.includes('email')) this.fieldErrors.email = msg;
                else if (lower.includes('tel') || lower.includes('telefono') || lower.includes('teléfono') || lower.includes('número')) this.fieldErrors.phone = msg;
                else this.errorMessage = msg;
            } else {
                this.errorMessage = err?.toString() ?? 'Error al editar proveedor';
            }
        }
    }

    async deleteSupplier(id: number) {
        try {
            await http.delete(`${import.meta.env.PUBLIC_API_URL}/suppliers/${id}`);
            await this.getSuppliers();
            this.deleteDialog = false;
        } catch (err: any) {
            this.errorMessage = err?.message ?? "Error al eliminar proveedor";
        }
    }

    showCreateModal() {
        this.supplier = null;
        this.createDialog = true;
    }

    showEditModal(supplier: Supplier) {
        this.supplier = supplier;
        this.editDialog = true;
    }

    showDeleteModal(supplier: Supplier) {
        this.supplier = supplier;
        this.deleteDialog = true;
    }
}

export const providerModel = new ProviderModel();
