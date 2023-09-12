import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params: { commentId } }: { params: { commentId: string } },
) {
  const { userId } = await req.json();

  await prisma.comment.delete({
    where: {
      id: commentId,
      ownerId: userId,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
export async function PUT(
  req: Request,
  { params: { id, commentId } }: { params: { id: string; commentId: string } },
) {
  const { searchParams } = new URL(req.url);
  const isLiking = searchParams.get("like") as "like" | "unlike";

  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({}, { status: 200 });
  }

  if (isLiking === "like") {
    await prisma.comment.update({
      where: {
        id: commentId,
        tweetId: id,
      },
      data: {
        likes: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json({}, { status: 201 });
  }

  await prisma.comment.update({
    where: {
      id: commentId,
      tweetId: id,
    },
    data: {
      likes: {
        disconnect: {
          id: userId,
        },
      },
    },
  });

  return NextResponse.json({}, { status: 201 });
}
