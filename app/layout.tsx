import "./globals.css";
import "@/app/globals.css"; // ✅ Adjust path if needed
import Provider from "./components/Provider";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";

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
          <Appbar/>
          <main className="flex-1" >
            {children}
          </main>
          <Footer/>
        </Provider>
      </body>
    </html>
  );
}
