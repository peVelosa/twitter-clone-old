import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        body: true,
        owner: {
          select: {
            userName: true,
            name: true,
            image: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
        updatedAt: true,
        ownerId: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return NextResponse.json(tweet, { status: 200 });
  } catch {
    return NextResponse.json({}, { status: 404 });
  }
}

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
