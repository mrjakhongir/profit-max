import { queryClient } from "@/shared/config/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";

type Properties = {
  children: React.ReactNode;
};

export const Providers: React.FC<Properties> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryClientProvider>
  );
};
