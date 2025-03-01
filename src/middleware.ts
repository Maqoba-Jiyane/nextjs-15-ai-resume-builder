import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);
const isUnsafeRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const url = new URL(request.url);
  const coupon = url.searchParams.get("coupon");

  // Prepare response
  const res = NextResponse.next();
  
  // ✅ Check if the coupon has already been validated (improves efficiency)
  const couponStored = request.cookies.has("coupon");

  // console.log(coupon, couponStored)
  // ✅ Only fetch if there's a coupon and it hasn't been validated yet
  if (coupon && !couponStored) {
    try {
      const response = await fetch(`${url.origin}/api/coupons/validate?coupon=${coupon}`, {
        method: "GET",
        cache: "no-store",
      });

      if (response.status === 200) {
        // ✅ Ensure cookies persist properly
        res.cookies.set("coupon", coupon, { path: "/", maxAge: 86400, httpOnly: false });
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
    }
  }

  // Protect non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const role = (await auth()).sessionClaims?.metadata?.role;

  // Redirect unauthorized users from unsafe routes
  if (isUnsafeRoute(request) && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return res;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
