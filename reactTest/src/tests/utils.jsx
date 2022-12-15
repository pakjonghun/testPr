import React from "react";
import { MemoryRouter, Routes } from "react-router-dom";

export function withRoute(routes, initialEntry = ["/"]) {
  return (
    <MemoryRouter initialEntries={initialEntry}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}
