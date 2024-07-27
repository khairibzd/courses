"use client";
import React, { useState } from "react";

import { createCourse } from "@/actions/courses";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "../file-uploader/fule-uploader";
import { FileSvgDraw } from "../file-uploader/file-upload-icon";
import { useFormState, useFormStatus } from "react-dom";

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

function AddCourseForm({ onClose }: { onClose: any }) {
  const initialState = false;

  const [files, setFiles] = useState<File[] | null>([]);
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  //@ts-ignore
  const [state, dispatch] = useFormState(createCourse, initialState);

  return (
    <form
      className="grid w-full  overflow-auto gap-5 justify-center items-center"
      action={dispatch}
    >
      <ModalBody>
        <Input
          label="Title"
          name="title"
          placeholder="Enter Course title"
          type="text"
          variant="bordered"
        />
        <Textarea
          label="Description"
          name="description"
          placeholder="Enter course description"
          className="max-w-xs"
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

function CreateButton({ close }: { close: any }) {
  const status = useFormStatus();

  return (
    <Button
      color="primary"
      isLoading={status.pending}
      type="submit"
      onPress={() => setTimeout(close, 3000)}
    >
      Create Course
    </Button>
  );
}

export default AddCourseForm;
