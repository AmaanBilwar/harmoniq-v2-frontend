"use client";
import React from "react";
import CameraComponent from "../start/CameraComponent";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div>
      <h1>Webcam Feed</h1>
      <CameraComponent />
    </div>
  );
};

export default Page;
