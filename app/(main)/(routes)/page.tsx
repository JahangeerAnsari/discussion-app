import { cn } from "@/lib/utils";
const state = false;
// const state = axios.get('/localhost:8080/user')
export default function Home() {
  // only login user can access
  return <h5>This is a protected routes</h5>;
}
