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
