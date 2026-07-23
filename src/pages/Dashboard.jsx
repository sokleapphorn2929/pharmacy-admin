import React from "react";
import Aside from "../components/Aside";
import CountSection from "../components/CountSection";
import GraphChart from "../components/GraphChart";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:gap-5 gap-3">
      <CountSection />
      <GraphChart />
    </div>
  );
}
