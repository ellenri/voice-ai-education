"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@stackframe/stack";

export default function Home() {
  const user = useUser();
  console.log(user);
  return (
    <div> <Button>Click me</Button>
    <UserButton />
    </div>
  );
}
