import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const tweets = await prisma.tweet.findMany({
      select: {
        id: true,
        body: true,
        comments: true,
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
        ownerId: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(tweets, { status: 200 });
  } catch {
    return NextResponse.json({}, { status: 404 });
  }
}

export async function POST(request: Request) {
  const { userId, body } = (await request.json()) as {
    userId: string;
    body: string;
  };

  if (!userId) return new Error("Missing user");
  if (!body) return new Error("Invalid tweet input");

  await prisma.tweet.create({
    data: {
      body,
      ownerId: userId,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
