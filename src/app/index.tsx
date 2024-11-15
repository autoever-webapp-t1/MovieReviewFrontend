import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import "./styles/global.css";
import { Suspense } from "react";
import { QueryProvider } from "./providers/QueryClientProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </QueryProvider>
);
