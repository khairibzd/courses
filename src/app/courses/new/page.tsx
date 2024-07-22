import AddCourseForm from "@/components/forms/AddCourseForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  return (
<Card className="max-w-lg mx-auto">
  <CardHeader className="space-y-1 text-center">
    <CardTitle className="text-2xl">Add Course</CardTitle>
    <CardDescription>Add a new course to the list</CardDescription>
  </CardHeader>
  <CardContent>
    <AddCourseForm />
  </CardContent>
</Card>
  );
};

export default Page;
