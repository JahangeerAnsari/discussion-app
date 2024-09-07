import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

interface ServerSideBarProps{
 serverId:string
}
const ServerSideBar = async ({serverId}:ServerSideBarProps) => {
 // return all the channel and members include the server and
 const profile = await currentProfile();
    if(!profile){
     return redirect('/')
    }
    const server = await db.server.findUnique({
     where:{
      id:serverId
     },
     include:{
      channels:{
       orderBy:{
        createdAt:'asc'
       }
      },
      members:{
       include:{
        profile:true
       },
       orderBy:{
        role:'desc'
       }
      }
     }
    })
    console.log("server---22",server);
    
    // filter out the channels and its types
    const textChannel = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audiChannel = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannel = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    // member (not include yourself)
    const members = server?.members.filter((member) => member.profileId !== profile.id)
    // find out the role of the profile which all the server created
    const role = server?.members.find((member) => member.profileId ===profile.id)?.role
 return (  
  <div className="flex flex-col h-full text-primary w-full
   dark:bg-[#2B2D31]">
    <ServerHeader
    server={server}
    role={role}
    />
  </div>
 );
}
 
export default ServerSideBar;