import type { Author, Course } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Button } from "./ui/button";
import { Microscope } from "lucide-react";
type Props = {
  author: Author;
  course: Course;
};

function CourseDetails({ author, course }: Props) {
  return (
    <section className="text-black">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
          Course Details{" "}
        </h1>

        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
          <Image
            src={course.image}
            height={100}
            width={100}
            alt={course.title}
            className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96 border-small border-gray-300 shadow-sm  "
          />

          <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
            <p className="text-sm text-blue-500 uppercase">
              Level : {course.levelId}
            </p>

            <h1 className="block mt-4 text-2xl font-semibold text-gray-800 md:text-3xl">
              {course.title}
            </h1>

            <p className="mt-3 text-sm text-gray-500  md:text-sm">
              {course.description}
            </p>

            <div className="flex items-center mt-6">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png" //here we can add an author image and pass it
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="mx-4">
                
                  <span className="text-sm text-gray-500"> Created by: </span>
                  <h1 className="text-sm text-gray-700">{author.name}</h1>
                  
               
              </div>
            </div>
            <p className="text-sm text-blue-500 mt-5 uppercase">
              Rating : {course.rating}
            </p>
          </div>
        </div>
        <div className="h-screen flex items-center justify-center">
          <div className="w-96 rounded-lg border shadow-md flex flex-col p-5 bg-white">
            {/* Top Section */}
            <div className="flex flex-col items-center">
              {/* Quota Name and Details */}
              <p className="mt-10 text-2xl font-light text-gray-700">
                {course.pricing} TND
              </p>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col px-3 mb-5 space-y-6">
              <div className="grid grid-cols-5 mt-3 gap-y-2">
                {/* Details 1 */}
                <div className="pl-2">
                  <Microscope />
                </div>
                <div className="col-span-4 text-sm font-light text-gray-700">
                  Course duration
                  <span>6 months</span>
                </div>

                {/* Details 2 */}
                <div className="pl-2">
                  <Microscope />
                </div>
                <div className="col-span-4 text-sm font-light text-gray-700">
                  Course duration
                  <span>6 months</span>
                </div>
                {/* Details 3 */}
                <div className="pl-2">
                  <Microscope />
                </div>
                <div className="col-span-4 text-sm font-light text-gray-700">
                  Course duration
                  <span>6 months</span>
                </div>

                {/* Details 4 */}
                <div className="pl-2">
                  <Microscope />
                </div>
                <div className="col-span-4 text-sm font-light text-gray-700">
                  Course duration
                  <span>6 months</span>
                </div>
              </div>
            </div>
            <Button>Add to cart</Button>
            <Button variant={"outline"} className="mt-3">
              Add to wish
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseDetails;

{
  /* // <section className="py-14">
    //   <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
    //     <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block">
    //       <div className="max-w-2xl">
    //         <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
    //           We do our best to make customers always happy
    //         </h3>
    //         <p className="mt-3 max-w-xl">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
    //           venenatis sollicitudin quam ut tincidunt.
    //         </p>
    //         <div className="flex items-center space-x-4">
    //          
    //           <h1 className="text-lg font-medium">{author.name}</h1>
    //          
    //         </div>
    //       </div>
    //       <div className="flex-none mt-6 md:mt-0 lg:mt-6">
    //         <Card
    //           className="max-w-[300px] border-none text-white"
    //           style={{
    //             background: "rgba(171, 171, 180, 0.1)",
    //             boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    //             backdropFilter: "blur(20px)",
    //             WebkitBackdropFilter: "blur(20px)",
    //             borderRadius: "10px",
    //             border: "1px solid rgba(255, 255, 255, 0.18)",
    //           }}
    //         >
    //           <CardHeader className="flex flex-col items-center justify-center gap-3 text-black font-bold">
    //             <h2 className="text-lg font-medium">2 days left</h2>
    //             <p className="mt-2 sm:mt-4">
    //               <strong className="text-3xl font-bold sm:text-4xl">
    //                 15 EUR
    //               </strong>
    //             </p>
    //           </CardHeader>
    //           <CardBody className="text-black text-center">
    //             <ul className="mt-6 space-y-2">
    //               <li className="flex flex-col gap-1 mb-2">
    //                 <h2>Course duration</h2>
    //                 <h2>Course level</h2>
    //                 <h2>Student Enrolled</h2>
    //                 <h2>Language</h2>
    //               </li>
    //             </ul>
    //           </CardBody>
    //           <CardFooter className="flex flex-col items-center gap-2">
    //             <a href="#" target="_blank">
    //               <Button className="bg-[#37B7C3]">Add to Wishlist</Button>
    //             </a>
    //             <a href="#" target="_blank">
    //               <Button className="bg-[#37B7C3]">Add to cart</Button>
    //             </a>
    //           </CardFooter>
    //         </Card>
    //       </div>
    //     </div>
    //   </div>
    // </section> */
}
