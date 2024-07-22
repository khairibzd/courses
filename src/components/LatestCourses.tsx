import { ArrowRight, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { cn } from "@/lib/utils";
import CoursesSkeleton from "./skeletons/CoursesSkeleton";
import AllCourses from "./AllCourses";
import { buttonVariants } from "./ui/button";
import { getAllCourses } from "@/actions/courses";

const LatestCourses = async () => {
    const {data,status, message} = await getAllCourses({levels: [], take: 4, skip:0});
  console.log(data)
  return (
    <section
      id="courses"
      aria-labelledby="courses-heading"
      className="space-y-8 py-8 md:pt-10 lg:pt-24 m-5"
    >
      <div className="flex items-end justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className='text-xl md:text-5xl text-start  font-bold leading-[1.1]'>Browse Latest Courses</h2>
        </div>
        <Link
          href="/courses"
          className="font-medium  hidden md:flex gap-1 hover:translate-x-1  transition-all"
        >
          See All Courses <ArrowRight />
        </Link>
      </div>
    
      <Suspense fallback={<CoursesSkeleton />}>
      
        <AllCourses 
        //@ts-ignore
         courses={data} />
      </Suspense>
      <Link
        href="/courses"
        className={cn(
          buttonVariants(),
          "mx-auto bg-[#0369a1] flex w-fit hover:before:-translate-x-48"
        )}
      >
        View all courses
        <ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
};

export default LatestCourses;
