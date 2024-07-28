"use server";
import slugify from "slugify";

import { levels } from "@/config";
import prisma from "@/lib/prisma";
import { validateCourseData } from "@/lib/Validators/course";
import { SearchCourses } from "@/types/serachCourses";
import { Author, Course } from "@prisma/client";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Retrieves a paginated list of courses from the database, optionally filtered by levels.
 * 
 * This function fetches courses based on the specified levels, with pagination support.
 * It orders the courses by their creation date in descending order and includes their level details.
 * 
 * @param {Object} params - The parameters for fetching the courses.
 * @param {string[]} [params.levels] - An optional array of level IDs to filter the courses by.
 * @param {number} params.take - The number of courses to take (limit).
 * @param {number} params.skip - The number of courses to skip (offset).
 * @returns {Promise<{ status: number; data: Course[] | null; message: string }>} - A promise that resolves to an object containing
 *                                                                                  the status code, the list of courses (if found),
 *                                                                                  and a message.

 */

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
      return { status: 404, data: courses, message: "There is no Courses" };
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

/**
 * Retrieves the author of a course by the course's slug.
 *
 * This function searches the database for a course with the specified slug
 * and returns the associated author. If the course is not found, it returns
 * an error message and null data. In case of an error, it logs the error
 * and throws it.
 *
 * @param {string} slug - The slug of the course whose author is to be retrieved.
 * @returns {Promise<{ message: string; data: Author | null }>} - A promise that resolves to an object containing
 *                                                               a message indicating success or error, and the
 *                                                               author data if found.
 */

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

/**
 * Retrieves a course from the database by its slug.
 * 
 * This function searches the database for a course with the specified slug.
 * If found, it returns the course object; if not, it returns null.
 * In case of an error, it returns an error message.
 * 
 * @param {string} slug - The slug of the course to be retrieved.
 * @returns {Promise<Course | string | null>} - A promise that resolves to the course object, 
 *                                              null if the course is not found, or an error message.
 
 */

export const getCourseBySlug = async (
  slug: string
): Promise<Course | string | null> => {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: slug },
    });
    // console.log("from server action",course)
    if (!course) {
      return null;
    }
    return course;
  } catch (error) {
    console.log(error);
    return "internal server error";
  }
};

/**
 * Searches for courses that match the given query string.
 *
 * This function retrieves up to 10 courses from the database whose titles contain the query string,
 * and organizes them by their levels.
 *
 * @param {string} query - The search query string.
 * @returns {Promise<SearchCourses[]>} - A promise that resolves to an array of courses organized by level.
 *
 */

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

/**
 * Creates a new course using the provided form data.
 *
 * This function validates the form data, checks for an existing course with the same slug,
 * uploads the course image, and stores the course data in the database.
 *
 * @param {FormData} formData - The form data containing course details and the image file.
 * @returns {Promise<{ success: boolean; message: string; slug?: string }>} - An object indicating the success of the operation, a message, and the course slug if successful.
 *
 * @example
 * const formData = new FormData();
 * formData.append("title", "My Course");
 * formData.append("description", "Course description");
 * formData.append("file", fileInput.files[0]);
 * const result = await createCourse(formData);
 * if (result.success) {
 *   console.log(`Course created with slug: ${result.slug}`);
 * } else {
 *   console.error(result.message);
 * }
 */

export async function createCourse(
  formData: FormData
): Promise<{ success: boolean; message: string; slug?: string }> {
  const { success, error, data } = validateCourseData(formData);

  if (!success) {
    return {
      success: false,
      message: error.issues
        .map((issue) => `${issue.path[0]}: ${issue.message}`)
        .join(" . "),
    };
  }

  const slug = slugify(data.title || "", { lower: true });
  const existingCourse = await getCourseBySlug(slug);

  if (existingCourse) {
    return {
      success: false,
      message: "Course title is already used. Please choose another title.",
    };
  }

  const image = formData.get("file") as File | undefined;
  if (!image || image.size === 0) {
    return { success: false, message: "At least one image is required." };
  }

  const imageUrl = await uploadFile(image);

  await prisma.course.create({
    data: {
      ...data,
      authorId: "clz41s77k0000dg06p2cs8keo",
      image: imageUrl,
      slug,
    },
  });

  revalidatePath("/");
  revalidatePath("/courses");

  return {
    success: true,
    message: "Course created successfully",
    slug,
  };
}

async function uploadFile(file: File): Promise<string> {
  // const supabase = createClientComponentClient();
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("course")
    .upload(`courses/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
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
