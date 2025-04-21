"use client";

import { revalidateArticles } from "@/lib/articles";
import { Button } from "./ui/button";
import { useState } from "react";

export const InvalidateButton = (props: React.ComponentProps<"button">) => {
  const mutation = useMutation(revalidateArticles);

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => {
        if (mutation.isPending) return;
        mutation.mutate();
      }}
      {...props}
    >
      {mutation.isPending ? "Invalidating..." : "Invalidate"}
    </Button>
  );
};

const useMutation = <Data, Args = void>(
  mutationFn: (args: Args) => Promise<Data>
) => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (args: Args) => {
    setIsPending(true);
    await mutationFn(args);
    setIsPending(false);
  };

  return {
    isPending,
    mutate,
  };
};
