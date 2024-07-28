"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  close: any;
};

const CreateButton = ({ close }: Props) => {
  const status = useFormStatus();
  // console.log(status.data?.get("title"));
  // const title = status.data?.get("title");

  //! we can use this function to check before closing the model whether the form validate or not (this need when we want to close the model from the button)
  // const isFormValid = () => {
  //   if (!status.data) return false;

  //   const entriesArray = Array.from(status.data.entries());

  //   for (const [key, value] of entriesArray) {
  //     if (!value) {
  //       return false;
  //     }
  //   }

  //   return true;
  // };

  return (
    <Button
      color="primary"
      type="submit"
      isLoading={status.pending}
      // onPress={() => {
      //   if (isFormValid()) {
      //     setTimeout(close, 5000); 
      //   }
      // }}
    >
      Create Course
    </Button>
  );
};

export default CreateButton;
