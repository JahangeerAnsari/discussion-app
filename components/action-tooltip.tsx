"use client";

import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react";
interface ActionToolTipProps{
 side?: "left" | "right" | "top" | "bottom",
 label:string,
 align?: "start" | "center" | "end",
 children: React.ReactNode
}

const ActionToolTip = ({children,side,label,align}:ActionToolTipProps) => {
 return ( 
  <TooltipProvider >
  <Tooltip delayDuration={50}>
    <TooltipTrigger asChild>
     {children}
    </TooltipTrigger>
    <TooltipContent side={side} align={align}>
   {label?.toLowerCase()}
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
  );
}
 
export default ActionToolTip;