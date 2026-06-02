import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarcasService {

  constructor(private prismaService: PrismaService) { }


  async create(createMarcaDto: CreateMarcaDto) {
    try {
      // Validar el nombre electrónico
      const existingMarca = await this.prismaService.marca.findUnique({
        where: {
          name: createMarcaDto.name,
        }
      });

      if (existingMarca) {
        throw new ConflictException('El nombre ya está en uso');
      }

      return await this.prismaService.marca.create({
        data: {
          ...createMarcaDto,
        }
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.marca.findMany({
        orderBy: {
          name: "asc",
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.marca.findUnique({
        where: {
          id,
        }
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    const marca = await this.findOne(id);

    console.log(marca);

    console.log(updateMarcaDto);

    try {
      if (!marca) {
        throw new NotFoundException('Marca no encontrada');
      }

      // Validar el correo nombre
      const existingMarca = await this.prismaService.marca.findUnique({
        where: {
          name: updateMarcaDto.name,
        }
      });

      if (existingMarca && existingMarca.id !== id) {
        throw new ConflictException('El nombre ya está en uso');
      }

      return await this.prismaService.marca.update({
        where: {
          id,
        },
        data: {
          ...updateMarcaDto,
        }
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.marca.delete({
        where: {
          id,
        }
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}