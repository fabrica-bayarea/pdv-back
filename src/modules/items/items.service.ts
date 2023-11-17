import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Item } from '@prisma/client';
import { CreateItemDto } from './item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

const prisma = new PrismaClient();


@Injectable()
export class ItemsService {
  async create(itemDto: CreateItemDto): Promise<Item> {
    return prisma.item.create({ data: itemDto });
  }

  async findAll(): Promise<Item[]> {
    return prisma.item.findMany();
  }

  async findOne(id: number): Promise<Item> {
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: number, itemDto: CreateItemDto): Promise<Item> {
    const updatedItem = await prisma.item.update({
      where: { id },
      data: itemDto,
    });
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return updatedItem;
  }

  async remove(id: number): Promise<void> {
    const deletedItem = await prisma.item.delete({
      where: { id },
    });
    if (!deletedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
