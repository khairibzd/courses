import Heading from "@/components/Heading";
import LatestCourses from "@/components/LatestCourses";
import PaginationComponent from "@/components/PaginationComponent";
import Image from "next/image";

export default function Home() {
  return (
    
      <div>

        
        <Heading />
        <div className="max-w-7xl mx-auto over">
          <LatestCourses />
        </div>
      </div>
  );
}
