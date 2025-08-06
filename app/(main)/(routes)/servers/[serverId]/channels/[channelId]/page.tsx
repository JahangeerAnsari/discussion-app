import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}
const ChannelConversation = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) return <SignIn />;
  // find the channel
  const channel = await db.channel.findUnique({
    where: {
      id: params?.channelId,
    },
  });
  // the member inside the server with profile id

  const member = await db.member.findFirst({
    where: {
      serverId: params?.serverId,
      profileId: profile.id,
    },
  });
  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <div className="flex-1">Future Messages</div>
      {/* for channel messages */}
      <ChatInput
      name={channel.name}
      type="channel"
      apiUrl="/api/socket/messages"
      query={{
        channelId:channel.id,
        serverId:channel.serverId
      }}
      />
    </div>
  );
};

export default ChannelConversation;
