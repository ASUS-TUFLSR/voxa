import './globals.css'
import Provider from "./components/Provider";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_KEY || '');

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
