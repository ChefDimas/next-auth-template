"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({label, href}: BackButtonProps) => {
  return <Button variant={"link"} size={"sm"} className={"font-normal w-full"} asChild={true}>
      <Link href={href}>{label}</Link>
  </Button>
};
