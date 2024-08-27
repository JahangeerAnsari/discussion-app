import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  // find all the member profile which is part of server
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  console.log("server",servers);
  
  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary bg-gray-300  w-full dark:bg-[#1E1F22] pt-3
  "
    >
      <NavigationAction />
      <Separator className="h-[1px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto " />
      <ScrollArea>
        {servers.map((server) => (
          <div key={server.id} className="mb-">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto   flex items-center flex-col gap-y-2 absolute bottom-[-1px]">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default NavigationSidebar;
