import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

const MAX_TWEETS_PER_REQUEST = 10;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    if (!cursor || cursor === "0") {
      const tweets = await prisma.tweet.findMany({
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
        take: MAX_TWEETS_PER_REQUEST,
      });
      return NextResponse.json(tweets, { status: 200 });
    }

    const tweets = await prisma.tweet.findMany({
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
      take: MAX_TWEETS_PER_REQUEST,
      cursor: {
        id: cursor,
      },
      skip: 1,
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
