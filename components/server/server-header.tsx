'use client'
import { ServerWithMembersWithProfiles } from "@/types/types";
// we want server in which channnel and members include
import { MemberRole, Server } from "@prisma/client";


interface ServerHeaderProps{
 server:ServerWithMembersWithProfiles ;
 role?:MemberRole 
}
const ServerHeader = ({server,role}:ServerHeaderProps) => {
 console.log("server,role",server,role);
 console.log("");
 
 return ( 
  <h1>server header</h1>
  );
}
 
export default ServerHeader;