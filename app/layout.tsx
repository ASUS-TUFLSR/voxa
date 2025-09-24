import './globals.css'
import Provider from "./components/Provider";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-react-richtexteditor/styles/material.css";


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
