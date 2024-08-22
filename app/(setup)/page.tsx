import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile();
  // if this profile is part of any server redirect to that server initially
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
         profileId: profile.id,
        },
      },
    },
  });
  if(server){
   return redirect(`/servers/${server.id}`)
  }
  return <div>Create a Server</div>;
}; 

export default SetupPage;
