import { db } from "@/lib/db"

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) =>{
 try {
  let conversation = await findConversation(memberOneId, memberTwoId);
  if(!conversation){
   conversation = await createConversation(memberOneId, memberTwoId);
  }
 } catch (error) {
  console.log("Error on getting Conversation",error);
  
 }
}

const findConversation = async(memberOneId: string, memberTwoId: string) =>{
 try {
  return await db.conversation.findFirst({
   where: {
    AND:[
     {memberOneId: memberOneId},
     {memberTwoId: memberTwoId}
    ]
   }, include:{
    memberOne:{
     include:{
      profile:true
     }
    },
    memberTwo:{
     include:{
      profile:true
     }
    }
   }
  })
 } catch  {
  return null;
 }
}
const createConversation = async (memberOneId: string, memberTwoId: string) =>{
 try {
  return await db.conversation.create({
   data:{
    memberOneId,
    memberTwoId
   },
   include:{
    memberOne:{
     include:{
      profile:true
     }
    },
    memberTwo:{
     include:{
      profile:true
     }
    }
   }
  })
 } catch  {
 return null;
  
 }
}