"use client";

import AddCourseForm from "@/components/forms/AddCourseForm";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function CreateCourseModel() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
      <Button className="max-w-fit" color="primary" onPress={onOpen}>
        Create Course
      </Button>

      <Modal isOpen={isOpen} placement={"auto"} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Course
              </ModalHeader>
              {isOpen && <AddCourseForm onClose={onClose} />}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
