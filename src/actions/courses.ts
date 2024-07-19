"use server"

import prisma from "@/lib/prisma"
import { Course } from "@prisma/client"

export const getAllCourses = async (): Promise<Course[]> => {
    const products = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Level: true,
      },
      take: 8,
    })
    return products
}