// Root layout — plain passthrough.
// Each route group provides its own <html> and <body>:
//   (site)/layout.tsx    → Garnish multisite frontend
//   (payload)/layout.tsx → Payload CMS admin panel
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
