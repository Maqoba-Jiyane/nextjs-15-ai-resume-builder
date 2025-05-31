import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/blog(.*)",
  "/sitemap.xml",
]);

const isUnsafeRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const url = new URL(request.url);
  const pathname = request.nextUrl.pathname;

  const res = NextResponse.next();

  // ✅ Store `refCode` in cookie if found in URL
  const refCode = url.searchParams.get("refCode");
  if (refCode) {
    const redirectUrl = new URL(pathname, request.url); // Clean URL (remove query param)
    const redirectResponse = NextResponse.redirect(redirectUrl);

    redirectResponse.cookies.set("refCode", refCode, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false,
    });

    return redirectResponse;
  }

  // ✅ Store coupon in cookie if found in query param and not already stored
  const coupon = url.searchParams.get("coupon");
  const couponAlreadySet = request.cookies.has("coupon");

  if (coupon && !couponAlreadySet) {
    try {
      const validationRes = await fetch(`${url.origin}/api/coupons/validate?coupon=${coupon}`, {
        method: "GET",
        cache: "no-store",
      });

      if (validationRes.ok) {
        res.cookies.set("coupon", coupon, {
          path: "/",
          maxAge: 60 * 60 * 24, // 1 day
          httpOnly: false,
        });
      }
    } catch (err) {
      console.error("Coupon validation failed:", err);
    }
  }

  // ✅ Protect non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  // ✅ Redirect users without admin role from unsafe areas
  const role = (await auth())?.sessionClaims?.metadata?.role;
  if (isUnsafeRoute(request) && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return res;
});

export const config = {
  matcher: [
    /*
      Apply middleware to all routes except:
      - _next/static
      - public files
      - static assets like .png, .css, .js, etc.
    */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js)).*)",
  ],
};
