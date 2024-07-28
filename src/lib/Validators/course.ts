import { z } from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Name must contain at least 3 character(s)",
    })
    .max(50, {
      message: "Name must contain at most 50 character(s)",
    }),

  description: z
    .string()
    .max(500, {
      message: "Description must contain at most 500 character(s)",
    })
    .optional(),
  
  levelId: z.string().min(1),
  pricing: z.coerce
    .number({
      required_error: "Price must be filled",
    })
    .min(10, {
      message: "Price must be greater than or equal to  20 TND",
    })
    .max(100000000, {
      message: "Price must be lower than or equal to 100000000 TND",
    }),
  });

export type coursePayload = z.infer<typeof courseSchema>;



export const validateCourseData = (formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    pricing: parseInt(formData.get("pricing") as string),
    levelId: formData.get("level") as string,
  };
  return courseSchema.safeParse(data);
};