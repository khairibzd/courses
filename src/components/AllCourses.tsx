import { getAllCourses } from "@/actions/courses";

import CourseCard from "./cards/CourseCard";

const AllCourses = async () => {
  const courses = await getAllCourses();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default AllCourses;
