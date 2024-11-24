import { AuthMiddleware } from '@/middlewares/auth';
import NotFound from '@/pages/404';
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
                    <AuthMiddleware>
                        <HelloWorld/>
                    </AuthMiddleware>
                ),
            }
        ]
    },
];

export const PublicRouter = routes;
