import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import "./styles/global.css";
import { Suspense } from "react";
import { QueryProvider } from "./providers/QueryClientProvider.tsx";
import MuiThemeProvider from "./providers/MuiThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <MuiThemeProvider>
      <Suspense fallback={<div></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </MuiThemeProvider>
  </QueryProvider>
);
