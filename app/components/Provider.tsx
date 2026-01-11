"use client";
import { registerLicense } from '@syncfusion/ej2-base'
registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_KEY || '');


const Provider = ({children}: {children:React.ReactNode}) => {
    return <>
    {children}
    </>
    
}

export default Provider;