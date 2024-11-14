import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Layout({children}) {
    const pathname = usePathname();
    const [footerVisibility, setFooterVisibility] = useState(true);
    
    useEffect(() => {
        if (pathname.includes("/invoice")) {
            setFooterVisibility(false)
        } else {
            setFooterVisibility(true)
        }
    }, [pathname])
    
    return (
        <div>
            <div className="p-5">
                {children}
            </div>
            {footerVisibility && <Footer />}
        </div>
    );
}