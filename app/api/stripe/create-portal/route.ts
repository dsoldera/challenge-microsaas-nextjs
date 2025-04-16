import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { db } from "../../../lib/firebase";
import stripe from "../../../lib/stripe";
 
export async function POST(req: NextRequest) {
   const session = await auth();
 
   const userId = session?.user?.id;

   console.log('HELLOW PORTAL', userId)
 
   if (!userId) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
 
   try {
     const userRef = db.collection('users').doc(userId);
     const userDoc = await userRef.get();
     console.log('DOC USER', userDoc.data())
 
     if (!userDoc.exists) {
       console.log('1');
       return NextResponse.json({ error: "User not found" }, { status: 404 });
     }
 
     const customerId = userDoc.data()?.stripeCustomerId; // Onde vem? // database - firebase
 
     if (!customerId) {
       console.log('2');
       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
     }
 
     const portalSession = await stripe.billingPortal.sessions.create({
       customer: customerId,
       return_url: `${req.headers.get('origin')}/`
     })
     console.log('3');
 
     return NextResponse.json({ url: portalSession.url });

   } catch (error) {
     console.error(error);
     return NextResponse.error()
   }
 }