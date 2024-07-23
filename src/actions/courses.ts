"use server";

import { levels } from "@/config";
import prisma from "@/lib/prisma";
import { SearchCourses } from "@/types/serachCourses";
import { Author, Course } from "@prisma/client";
export const getAllCourses = async ({
  levels,
  take,
  skip,
}: {
  levels?: string[];
  take: number;
  skip: number;
}): Promise<{
  status: number;
  data: Course[] | null;
  message: string;
}> => {
  try {
    const courses = await prisma.course.findMany({
      where:
        levels && levels.length > 0 ? { levelId: { in: levels } } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Level: true,
      },
      take,
      skip,
    });

    if (!courses || courses.length === 0) {
      return { status: 404, data: courses, message: "Courses not found" };
    }

    return {
      status: 200,
      data: courses,
      message: "Courses retrieved successfully",
    };
  } catch (error) {
    console.error(error);
    return { status: 500, data: null, message: "Internal server error" };
  }
};

export const getAuthorByCourseSlug = async (
  slug: string
): Promise<{
  message: string;
  data: Author | null;
}> => {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: slug },
      select: {
        Author: true,
      },
    });
    if (!course) {
      return { message: "error", data: null };
    }
    return { message: "success", data: course.Author }; // Return the author
  } catch (error) {
    console.error("Error fetching author:", error);
    throw error; // Handle the error appropriately
  }
};

export const getCourseBySlug = async (
  slug: string
): Promise<Course | string> => {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: slug },
    });
    if (!course) {
      return "error";
    }
    return course;
  } catch (error) {
    console.log(error);
    throw error; // Handle the error appropriately
  }
};

export const searchCourses = async (
  query: string
): Promise<SearchCourses[]> => {
  const filteredCourses = await prisma.course.findMany({
    where: {
      title: {
        contains: query,
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      levelId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const coursesByLevels = levels.map((level) => ({
    level: level.name,
    courses: filteredCourses.filter((course) => course.levelId === level.slug),
  }));

  return coursesByLevels;
};

