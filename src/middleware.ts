import { authMiddleware } from "@clerk/nextjs"

// This example protects all routes including api/trpc routes
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/news",
    "/news/*",
    "/api/news/*",
    "/categories/*",
    "/search",
    "/feed"
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/api/webhook", "/api/news/public"]
})

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/"
  ],
} 