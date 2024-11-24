import HelloWorld from '@/pages/hello-world';
import React from 'react';

const routes = [
    {
        path: "/",
        element: <HelloWorld/>,
    },
];

export const PublicRouter = routes;
