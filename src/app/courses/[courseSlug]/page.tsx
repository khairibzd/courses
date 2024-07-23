import { getAuthorByCourseSlug, getCourseBySlug } from "@/actions/courses";
import CourseDetails from "@/components/CourseDetails";
import React from "react";

type Props = {
  params: {
    courseSlug: string;
  };
};

const page = async ({ params }: Props) => {


  const { data } = await getAuthorByCourseSlug(params.courseSlug);
  const course = await getCourseBySlug(params.courseSlug);
  return (
    <section>
      <CourseDetails //@ts-ignore
        author={data}
        //@ts-ignore
        course={course}
      />
    </section>
  );
};

export default page;
