import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PublicRouter } from './routes/index';

const router = createBrowserRouter(PublicRouter);
const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);
    root.render(
        <RouterProvider router={router} />
    );
}
