import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteLinkProps {
  params?: { inviteCode: string };
}
// if there is invite code add to the new server
const InviteLink = async ({ params }: InviteLinkProps) => {
  console.log("params1222222222222", params);
  const profile = await currentProfile();
  if (!profile) {
    return <SignIn />;
  }
  if (!params?.inviteCode) {
    return redirect("/");
  }

  // lets this invite code part of server of any profile
  const existingServer = await db.server.findUnique({
    where: {
      inviteCode: params?.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingServer) {
    redirect(`/servers/${existingServer.inviteCode}`);
  }
  // if new invitecode then add to the member into the server
  const server = await db.server.update({
    where: {
      inviteCode: params?.inviteCode,
    },
    // adding new member by invite code to the
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return null;
};

export default InviteLink;
