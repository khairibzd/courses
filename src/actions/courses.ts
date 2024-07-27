"use server";
import slugify from "slugify";

import { levels } from "@/config";
import prisma from "@/lib/prisma";
import { coursePayload, courseSchema } from "@/lib/Validators/course";
import { SearchCourses } from "@/types/serachCourses";
import { Author, Course } from "@prisma/client";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
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

export async function createCourse(prevState: any, formData: FormData) {
  const image: any = formData.get("file");
  let imageUrl = "";

  if (image.size != 0) {
    imageUrl = await uploadFile(image);
  }
  const slug = slugify(formData.get("title") as any, { lower: true });
  const course: Omit<
    Course,
    "id" | "image" | "authorId" | "createdAt" | "updatedAt"
  > = {
    title: formData.get("title") as any,
    description: formData.get("description") as any,
    slug: slug,
    levelId: formData.get("level") as any,
    pricing: parseInt(formData.get("pricing") as any),
  };

  const result = await prisma.course.create({
    data: {
      ...course,
      authorId: "clyt8po91000027tq2ypyf4yx",
      image: imageUrl,
    },
  });
  revalidatePath("/courses/new");

  revalidatePath("/");
  revalidatePath("/courses");
  return true;
}

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

async function uploadFile(file: File): Promise<string> {
  const supabase = createClientComponentClient();
  // const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("course")
    .upload(`courses/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    // Handle error
    console.log(error);

    return error.message;
  } else {
    const { data } = supabase.storage
      .from("course")
      .getPublicUrl(`courses/${file.name}`);

    // console.log(data.publicUrl)
    return data.publicUrl;
    // console.log(data)
  }
}

async function deleteFile(filePath: string) {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("courses")
    .remove([filePath]);
}
