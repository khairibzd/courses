"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import SearchButton from "../SearchButton";
import Link from "next/link";

export const Navbar = () => {
  //   const path = usePathname();
  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      style={{
        background: "transparent", // Set background to transparent
        color: "white",
        // boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: "blur(5px)",
        // WebkitBackdropFilter: 'blur(5px)',
        // borderRadius: '10px',
        // border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full text-black"
        justify="start"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Courses</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* <ul className="hidden lg:flex gap-4 justify-center items-center ml-2"> */}
      <NavbarContent
        className=" lg:flex gap-4 ml-2 text-black basis-1/5 sm:basis-full"
        justify="center"
      >
        <SearchButton />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            href="/courses/new"
            className={buttonVariants({
              size: "sm",
            })}
          >
            Add Course
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <UserButton /> */}

        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* <div className="mx-4 mt-2 flex flex-col gap-2 items-center"> */}
        {/* {config.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === config.navMenuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))} */}
        {/* </div> */}
      </NavbarMenu>
    </NextUINavbar>
  );
};
