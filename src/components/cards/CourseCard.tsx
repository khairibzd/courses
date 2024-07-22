"use client";
import { Course } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  course: Course;
}

const CourseCard: React.FC<ProductCardProps> = ({ course }) => {
  //

  return (
    <div className="group/card shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4 h-full">
      <Link href={`/courses/${course.slug}`}>
        <div className="aspect-square m-3 rounded-2xl bg-gray-100 relative">
          <Image
            src={course.image}
            fill
            sizes="200"
            alt={course.title}
            className="aspect-square object-cover rounded-2xl"
          />
        </div>
        <div className="px-4 space-y-3 pb-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">{course.title}</p>
            <p className="font-semibold group-hover/card:text-[#0369a1] text-lg truncate">
              {course.levelId}
            </p>
          </div>
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="font-semibold text-[#0284c7]">
              {formatPrice(course.pricing)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
