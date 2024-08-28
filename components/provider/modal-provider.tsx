"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render anything until mounted
  }

  return <CreateServerModal />;
};
