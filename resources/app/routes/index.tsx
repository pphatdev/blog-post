// import { AuthMiddleware } from '@/middlewares/auth';
import NotFound from '@/pages/404';
import Dashboard from '@/pages/admin/dashboard/page';
import Blogs from '@/pages/blogs/page';
import HelloWorld from '@/pages/hello-world';
import React from 'react';

const routes = [
    {
        path: "/",
        element: <HelloWorld/>,
    },
    {
        path: "/login",
        element: <NotFound/>,
    },
    {
        path: "app",
        children: [
            {
                path: "",
                element: (
                    <Dashboard></Dashboard>
                    // <AuthMiddleware>
                    //     <HelloWorld/>
                    // </AuthMiddleware>
                ),
            },
            {
                path: "blog",
                element: (
                    <Blogs></Blogs>
                    // <AuthMiddleware>
                    //     <HelloWorld/>
                    // </AuthMiddleware>
                ),
            }
        ]
    },
];

export const PublicRouter = routes;
