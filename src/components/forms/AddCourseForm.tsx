"use client";
import React, { useState } from "react";

import { createCourse, getCourseBySlug } from "@/actions/courses";
import { useParams, usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "../file-uploader/fule-uploader";
import { FileSvgDraw } from "../file-uploader/file-upload-icon";

import { levels } from "@/config";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";
import CreateButton from "../buttons/add-course-button";

function AddCourseForm({ onClose }: { onClose: any }) {
  const initialState = false;
  const { replace } = useRouter();

  const [files, setFiles] = useState<File[] | null>([]);
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  // this is the client side validation to show the user a validation message
  // the error message is thrown from the server action whether from zod or  another type of error (course already used)
  const clientAction = async (formData: FormData) => {
    try {
      const result = await createCourse(formData);
      if (result.success) {
        toast.success(result.message);
        // here after the user create the course whether he want to return to the same page when he was or redirect him to the course details that he just created
        replace(`/courses/${result.slug}`); // Redirect if needed
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  // here we can directly call the dispatch function in the form action but without client validatio
  //@ts-ignore
  // const [state, dispatch] = useFormState(createCourse, initialState);

  return (
    <form
      className="grid w-full  overflow-auto gap-5 justify-center items-center"
      action={clientAction}
    >
      <ModalBody>
        <Input
          label="Title"
          name="title"
          placeholder="Enter Course title"
          type="text"
          variant="bordered"
          isRequired={true}
        />
        <Textarea
          label="Description"
          name="description"
          placeholder="Enter course description"
          className="max-w-lg"
        />

        <Autocomplete
          defaultFilter={() => true}
          label="levels"
          name="level"
          placeholder="Level"
          type="text"
          variant="bordered"
        >
          {levels.map((level) => (
            <AutocompleteItem key={level.slug}>{level.slug}</AutocompleteItem>
          ))}
        </Autocomplete>
        <Input
          type="number"
          label="Price"
          name="pricing"
          placeholder="0.00"
          labelPlacement="outside"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">TND</span>
            </div>
          }
        />

        <FileUploader
          className="relative rounded-lg bg-background p-2"
          dropzoneOptions={dropZoneConfig}
          value={files}
          onValueChange={setFiles}
        >
          <FileInput className="outline-dashed outline-1 outline-white">
            <div className="flex w-full flex-col items-center justify-center pb-4 pt-3 ">
              <FileSvgDraw />
            </div>
          </FileInput>
          <FileUploaderContent>
            {files &&
              files.length > 0 &&
              files.map((file, i) => (
                <FileUploaderItem key={i} index={i}>
                  <span>{file.name}</span>
                </FileUploaderItem>
              ))}
          </FileUploaderContent>
        </FileUploader>
      </ModalBody>

      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <CreateButton close={onClose} />
      </ModalFooter>
    </form>
  );
}

export default AddCourseForm;
