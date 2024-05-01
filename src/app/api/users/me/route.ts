import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    //Extracting data from token
    let userId;
    try {
      userId = await getDataFromToken(request);
    } catch (error: any) {
      console.log(error.message);
      return NextResponse.json({ msg: "Invalid Token" }, { status: 401 });
    }

    const user = await User.findById(userId).select("-password");

    //Check if there is no user
    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User doesn't exists" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, mgs: "User found", data: user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "oops! something went wrong on our side." },
      { status: 500 }
    );
  }
}
