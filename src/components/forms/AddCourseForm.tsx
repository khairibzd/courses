"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema, coursePayload } from "@/lib/Validators/course";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createCourse } from "@/actions/courses";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {};

function AddCourseForm({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { replace } = useRouter();
  const form = useForm<coursePayload>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      level: "",
      pricing: 0,
      imageUrl: "",
    },
  });
  const onSubmit = async (values: coursePayload) => {
    setIsLoading(true);

    const { course: course, message, status } = await createCourse(values);

    if (status === 201) {
      toast.success(message);
      replace(`/courses/${course?.slug}`);
    } else {
      toast.error(message);
    }

    setIsLoading(false);
  };
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10 MB limit
        alert("File size exceeds the 10 MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        field.onChange(reader.result); // Convert file to data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full  overflow-auto gap-5 justify-center items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type course title here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type course description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>Level</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full bg-gray-200">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pricing"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center">
                      DT
                    </p>
                    <Input
                      type="number"
                      className="pl-8"
                      placeholder="0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Upload</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileUpload(event, field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          //@ts-ignore
          type="submit"
          isLoading={isLoading}
        >
          Add Course
        </Button>
      </form>
    </Form>
  );
}

export default AddCourseForm;
