import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";

interface ServerSideBarProps {
  serverId: string;
}
const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-2 w-2 mr-2" />,
  [ChannelType.AUDIO]: <Mic className="h-2 w-2 mr-2" />,
  [ChannelType.VIDEO]: <Video className="h-2 w-2 mr-2" />,
};

const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-rose-500" />,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  [MemberRole.GUEST]: null,
};
const ServerSideBar = async ({ serverId }: ServerSideBarProps) => {
  // return all the channel and members include the server and
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "desc",
        },
      },
    },
  });
  console.log("server---22", server);

  // filter out the channels and its types
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audiChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  // member (not include yourself)
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );
  // find out the role of the profile which all the server created
  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;
  return (
    <div
      className="flex flex-col h-full text-primary w-full
   dark:bg-[#2B2D31]"
    >
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channel",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  name: channel.name,
                  id: channel.id,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channel",
                type: "channel",
                data: audiChannels?.map((channel) => ({
                  name: channel.name,
                  id: channel.id,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channel",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  name: channel.name,
                  id: channel.id,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  name: member?.profile.name,
                  id: member.id,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
             <div className="space-y-[2px]">
            {textChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
            </div>
          </div>
        )}
        {/* audio channels */}
        {!!audiChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
             <div className="space-y-[2px]">
            {audiChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
            </div>
          </div>
        )}
        {/* video channels */}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
            {videoChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
            </div>
          </div>
        )}
        {/* server members */}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              server={server}
              role={role}
              label="Members"
            />
            <div className="space-y-[2px]">
              {members?.map((member) => (
                <ServerMember 
                key={member.id}
                member={member}
                server={server}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
