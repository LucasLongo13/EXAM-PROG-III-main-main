import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.suppliers.findMany({
      orderBy: { name: "asc" }
    });
  }

  async findOne(id: number) {
    const supplier = await this.prisma.suppliers.findUnique({ where: { id } });
    if (!supplier) throw new NotFoundException("Proveedor no encontrado");
    return supplier;
  }

  async create(dto: CreateSupplierDto) {
    const name = dto.name.trim();
    const email = dto.email?.trim();

    const existsName = await this.prisma.suppliers.findUnique({ where: { name } });
    if (existsName) throw new BadRequestException("El nombre ya está en uso");

    if (email) {
      const existsEmail = await this.prisma.suppliers.findUnique({ where: { email } });
      if (existsEmail) throw new BadRequestException("El email ya está en uso");
    }

    return this.prisma.suppliers.create({
      data: {
        name,
        email,
        phone: dto.phone?.trim()
      }
    });
  }

  async update(id: number, dto: UpdateSupplierDto) {
    const supplier = await this.prisma.suppliers.findUnique({ where: { id } });
    if (!supplier) throw new NotFoundException("Proveedor no encontrado");

    const data: any = {};

    if (dto.name !== undefined) {
      const name = dto.name.trim();
      const existsName = await this.prisma.suppliers.findUnique({ where: { name } });

      if (existsName && existsName.id !== id)
        throw new BadRequestException("El nombre ya está en uso");

      data.name = name;
    }

    if (dto.email !== undefined) {
      const email = dto.email?.trim() ?? null;

      if (email) {
        const existsEmail = await this.prisma.suppliers.findUnique({ where: { email } });
        if (existsEmail && existsEmail.id !== id)
          throw new BadRequestException("El email ya está en uso");
      }

      data.email = email;
    }

    if (dto.phone !== undefined) {
      data.phone = dto.phone?.trim() ?? null;
    }

    return this.prisma.suppliers.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    const supplier = await this.prisma.suppliers.findUnique({ where: { id } });
    if (!supplier) throw new NotFoundException("Proveedor no encontrado");

    return this.prisma.suppliers.delete({ where: { id } });
  }
}
