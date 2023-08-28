import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const res = await prisma.tweet.findMany({});
    return NextResponse.json({ data: res }, { status: 200 });
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
