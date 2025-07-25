"use client";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { Button } from "~/components/ui/button";
import type { User } from "../../types";
import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";

interface CreateThreadButtonProps {
  userIdentifier: User["_id"];
}

export default function CreateThreadButton({
  userIdentifier,
}: CreateThreadButtonProps) {
  const [sent, setSent] = useState(false);
  const create = useMutation(api.threads.create);
  return (
    <Button
      variant={sent ? "ghost" : "outline"}
      className="cursor-pointer rounded-full px-6 py-0"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        void create({ receiverIdentifier: userIdentifier });
        setSent(true);
        setTimeout(() => setSent(false), 2000);
      }}
    >
      {sent ? (
        <Check className="h-4 w-4" />
      ) : (
        <MessageCircle className="h-4 w-4" />
      )}
    </Button>
  );
}
