import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "Invalid token!" },
        { status: 400 }
      );
    }

    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { success: true, msg: "Email verified successfully" },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { msg: "oops! something went wrong on our side." },
      { status: 500 }
    );
  }
}
