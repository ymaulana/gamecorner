import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { email: string } },
) {
  const email = params.email;
  try {
    const posts = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Couldn't fetch post" });
  }
}
