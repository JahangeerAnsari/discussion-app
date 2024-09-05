import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { name, type } = await req.json();
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const ServerId = searchParams.get("ServerId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!ServerId)
      return new NextResponse("Server ID missing", { status: 401 });
    if (name === "general")
      return new NextResponse('Name cannot be "general" ');
    const server = await db.server.update({
      where: {
        id: ServerId,
        // we want member add channel with role moderator and admin
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name,
            type,
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    console.log("[POST_CHANNEL]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
