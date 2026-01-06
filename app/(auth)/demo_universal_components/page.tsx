"use client";

import React from "react";
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import { Button } from "@/components/ui/Button/Button";

export default function DemoUniversalComponentsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "#fefdf9",
        color: "#191919",
      }}
    >
      <PageTitle />

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 480 }}>
          <Button variant="primary" fullWidth>
            Primary (Save / Submit)
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="secondary">
            Secondary (Cancel / Upload)
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="ghost">
            Ghost (Outlined action)
          </Button>
        </div>
        <div style={{ width: "100%", maxWidth: 480 }}>
          <Button variant="primary" disabled fullWidth>
            Disabled
          </Button>
        </div>
      </section>
    </main>
  );
}


