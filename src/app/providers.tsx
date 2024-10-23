'use client';

import { useState, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = (props: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default Providers;