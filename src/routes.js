import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import NotFound from "./components/NotFound";


const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/add/book",
        name: "AddBook",
        component: AddBook
    },
    {
        path: "/update/book/:id",
        name: "UpdateBook",
        component: UpdateBook
    },

    {
        path: "/:catchAll(.*)",
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
