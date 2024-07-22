import prisma from "@/lib/prisma";
import { getAllCourses } from "@/actions/courses";
import AllCourses from "@/components/AllCourses";
import PaginationComponent from "@/components/PaginationComponent";
import { Suspense } from "react";
import CoursesSkeleton from "@/components/skeletons/CoursesSkeleton";
import { Course } from "@prisma/client";
import CourseFilter from "./course-filter";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    levels?: string;
  };
}) {
  function stringToArray(str: string): string[] {
    return str.split(",").map((element) => element.trim());
  }

  const levels = searchParams?.levels ? stringToArray(searchParams.levels) : [];
  const page = parseInt(searchParams?.page || "1");
  const pageSize = 4;

  const { data: courses } = await getAllCourses({
    take: pageSize,
    skip: (page - 1) * pageSize,
    levels,
  });

  const courseCount = await prisma.course.count();
  return (
    <section>
      <h1 className="text-center text-4xl mb-10">Explore All Courses</h1>
      <CourseFilter />
      <div className="flex flex-col gap-3 m-10 mx-36">
        <Suspense fallback={<CoursesSkeleton />}>
          <AllCourses
            //@ts-ignore
            courses={courses}
          />
        </Suspense>
        <PaginationComponent
          pageSize={pageSize}
          currentPage={page}
          itemCount={courseCount}
        />
      </div>
    </section>
  );
}
