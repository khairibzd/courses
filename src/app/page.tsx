import Courses from "@/components/Courses";
import Heading from "@/components/Heading";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Heading />
      <div className="max-w-7xl mx-auto over">
        <Courses />
      </div>
    </div>
  );
}
