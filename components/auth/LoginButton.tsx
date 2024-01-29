"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  // Define the router
  const router = useRouter();


  const onClick = () => {
    router.push("/auth/login")
  };

  // If the mode is redirect, then we want to redirect to the login page
  if (mode === 'modal'){
    return(
        <span>
        TODO: implement modal
        </span>
    )
  }

  return (
    <span onClick={onClick} className={"cursor-pointer text-red"}>
      {children}
    </span>
  );
};
