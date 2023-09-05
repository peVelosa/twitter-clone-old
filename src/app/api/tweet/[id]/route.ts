import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  const { userId } = await req.json();

  await prisma.tweet.delete({
    where: {
      id,
      ownerId: userId,
    },
  });

  return NextResponse.json({}, { status: 201 });
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  const { searchParams } = new URL(req.url);
  const isLiking = searchParams.get("like") as "like" | "unlike";

  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({}, { status: 200 });
  }

  if (isLiking === "like") {
    await prisma.tweet.update({
      where: {
        id,
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

  await prisma.tweet.update({
    where: {
      id,
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
