import { AuthMiddleware } from '@/middlewares/auth';
import NotFound from '@/pages/404';
import Dashboard from '@/pages/dashboards/page';
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
        path: "/app",
        children: [
            {
                path: "",
                element: (
                    <Dashboard></Dashboard>
                    // <AuthMiddleware>
                    //     <HelloWorld/>
                    // </AuthMiddleware>
                ),
            }
        ]
    },
];

export const PublicRouter = routes;
