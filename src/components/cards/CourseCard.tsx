"use client";
import { Course } from '@prisma/client';
import Image from 'next/image'
import Link from 'next/link';
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  course: Course 
}

const CourseCard: React.FC<ProductCardProps> = ({ course }) => {
//  

  return (
    <div className="group/card shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4 h-full">
      <Link
        href={`/courses/${course.slug}?courseId=${course.id}`}
      >
        {/* Images and Actions */}
        //! here need to add an image attribute in the course model 
        <div className="aspect-square m-3 rounded-2xl bg-gray-100 relative">
          {/* <Image
            // @ts-ignore
            src={course.images?.[0].url}
            fill
            sizes="200"
            // @ts-ignore
            alt={course.name}
            className="aspect-square object-cover rounded-2xl"
          /> */}
        </div>
        <div className="px-4 space-y-3 pb-6">
          <div className="space-y-1">
            {/* Product Name */}
            <p className="text-sm text-gray-500">{course.title}</p>
            <p
              className="font-semibold group-hover/card:text-[#0369a1] text-lg truncate"
             
            >
              {course.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="font-semibold text-[#0284c7]">
              {/* @ts-expect-error */}
              {formatPrice(parseFloat(course.price))}
            </div>
        
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
