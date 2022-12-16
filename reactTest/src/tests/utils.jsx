import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { MemoryRouter, Routes } from "react-router-dom";
import { YoutubeApiContext } from "../context/YoutubeApiContext";

export function withRoute(routes, initialEntry = ["/"]) {
  return (
    <MemoryRouter initialEntries={initialEntry}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

const createTestQuery = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
      },
    },
  });
};

export const withAllContext = (children, value) => {
  const testClient = createTestQuery();
  return (
    <YoutubeApiContext.Provider value={value}>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </YoutubeApiContext.Provider>
  );
};
