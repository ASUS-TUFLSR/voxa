import "./globals.css";
import Provider from "./components/Provider";

export const metadata = {
     title: "Voxa",
     description:" Voxa an independent blog posting application for the world community"
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" >
        <Provider>
          <main className="flex-1" >
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
