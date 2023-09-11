import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  const comments = await prisma.comment.findMany({
    where: {
      tweetId: id,
    },
    select: {
      id: true,
      body: true,
      updatedAt: true,
      ownerId: true,
      owner: {
        select: {
          image: true,
          userName: true,
          name: true,
        },
      },
      tweetId: true,
      likes: {
        select: {
          id: true,
        },
      },
    },
  });
  return NextResponse.json(comments, { status: 200 });
}
