import RegisterProvider from "./_provider/RegisterProvider";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RegisterProvider>{children}</RegisterProvider>;
}
