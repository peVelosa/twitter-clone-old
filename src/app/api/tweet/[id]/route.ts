import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  await prisma.tweet.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
