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

export async function POST(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  const { userId, body } = (await req.json()) as {
    userId: string;
    body: string;
  };

  if (!userId) return new Error("Missing user");
  if (!body) return new Error("Invalid tweet input");

  await prisma.comment.create({
    data: {
      body,
      tweetId: id,
      ownerId: userId,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
