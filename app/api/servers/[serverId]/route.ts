import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
   const { name, imageUrl } = await req.json();
  const profile = await currentProfile();
  if (!profile) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  if (!params.serverId) {
    return new NextResponse("Server Id is missing", { status: 400 });
  }
  // only ADMIN can update server name and image url
  const server = await db.server.update({
    where: {
      id: params.serverId,
      profileId: profile.id,
    },
    data: {
      name,
      imageUrl,
    },
  });
  return NextResponse.json(server,{status:200});
  } catch (error) {
   console.log("[SERVER_ID Update]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
