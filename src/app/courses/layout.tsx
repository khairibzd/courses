"use client";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CourseFilter from "./course-filter";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
