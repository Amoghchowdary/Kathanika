import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { routerBasePath } from "./lib/base-path";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    basepath: routerBasePath(),
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
