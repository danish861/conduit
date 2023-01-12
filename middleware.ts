import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const verify = req.cookies.get("authToken")?.value;
  let url = req.url;

  // console.log("==============middle ware data===============", req.url);
  // console.log("what is this url value", url);

  if (!verify && url.includes("/settings")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (!verify && url.includes("/editor")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (verify && url.includes("/login")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  if (verify && url.includes("/register")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
}
