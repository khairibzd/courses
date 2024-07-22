import { getAllCourses } from "@/actions/courses";

import CourseCard from "./cards/CourseCard";
import { Course } from "@prisma/client";

type Props = {
    courses: Course[]
  };
const AllCourses = async ({courses}: Props) => {

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {courses && courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
      {/* <p>{message}</p> */}
    </div>
  );
};

export default AllCourses;
