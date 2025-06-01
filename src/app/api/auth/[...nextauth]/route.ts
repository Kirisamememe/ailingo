import type { NextRequest } from "next/server";
import { handlers } from "@/auth";

/**
 * Auth route
 */
export const { GET, POST } = handlers as {
  GET: (request: NextRequest) => Promise<Response>;
  POST: (request: NextRequest) => Promise<Response>;
};
