import LoginProvider from "./_provider/LoginProvider";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginProvider>{children}</LoginProvider>;
}
