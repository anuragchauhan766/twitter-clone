"use client";
import UnderService from "@/components/common/UnderService";

import { usePathname } from "next/navigation";
import React from "react";

function Notifications() {
  const pathname = usePathname();
  return <UnderService pathname={pathname} />;
}

export default Notifications;
