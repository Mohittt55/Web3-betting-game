import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (email === "demo@user.com" && password === "demo123") {
          return { id: "1", name: "Demo User", email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
