'use client';
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { useParams } from "next/navigation";

interface MainServerLayoutChildren{
children: React.ReactNode
}
// Layout file name should be layout otherwise it will not work 
const MainServerLayout = ({children}:MainServerLayoutChildren) => {

 return ( 
    <div className="h-full">
       <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        {/* this space for sidebar */}
        <NavigationSidebar/>
       </div>
       <main className="md:pl-[72px] h-full">
         {children}
       </main>
    </div>
  );
}
 
export default MainServerLayout;