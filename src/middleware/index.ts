import { sequence } from "astro:middleware";

import securityHeaders from "./securityHeaders";

const middleware = () => sequence(securityHeaders);

export const onRequest = middleware();
