import './globals.css';
import MainHeader from "@/components/main-header/main-header";

export const metadata = {
    title: 'NextLevel Food Demo | Angel Montes de Oca',
    description: 'A demo of a food sharing platform built with Next.js and AWS RDS.',
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>

        <MainHeader/>
        {children}
        </body>
        </html>
    );
}
