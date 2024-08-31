'use client';
import { useEffect, useState } from "react"

export const useCurrentOrigin = ()=> {
 const [mounted,setMounted]= useState(false);
     useEffect(() =>{
      setMounted(true)
     },[])
   const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin :"";
   if(!mounted) {
    return ""
   }
   return origin;
}