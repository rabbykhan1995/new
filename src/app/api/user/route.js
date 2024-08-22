import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async (req) => {
  try {
    const user = await prisma.user.findMany();

    if (!user) {
      return NextResponse.json({ msg: "user not found" }, { status: 300 });
    }

    return NextResponse.json(
      { msg: "user founded successfully", result: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "server error" }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const { name, age } = await req.json();

    const user = await prisma.user.create({ data: { name, age } });

    if (!user) {
      return NextResponse.json(
        { msg: "Sorry!no user has been created" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        msg: "Congrats!User created successfully",
        user: { name, age },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "error in server" }, { status: 500 });
  }
};
