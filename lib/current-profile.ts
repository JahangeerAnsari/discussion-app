import { auth } from "@clerk/nextjs/server";
import {db} from '@/lib/db'
export const currentProfile = async () =>{
 const {userId} =  auth();
 if(!userId){
  throw new Error(`User not found with userId: ${userId}`);
 }
 const profile = await db.profile.findUnique({
  where:{
   userId
  }
 })
 if(!profile){
  throw new Error(`User profile not found`);
 }
 return profile;
}