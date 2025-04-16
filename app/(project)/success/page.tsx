import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";

 
 export default async function Success() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
   return (
     <div className="flex flex-col items-center justify-center h-screen">
       <h1 className="text-4xl font-bold mb-10">Sucesso</h1>

       <Link href="/pagamentos">Pagamentos</Link>
       
     </div>
   )
 }