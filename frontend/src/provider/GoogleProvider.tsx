"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId="115527002001-aip1kdpicr0nicfrrqm0ih0va1ol8h3c.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};
