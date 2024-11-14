import { ProductsContextProvider } from "../../components/ProductsContext";
import { MerchantContextProvider } from "../../components/MerchantContext";
import { LoginContextProvider } from "../../components/LoginContext";
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ProductsContextProvider>
            <MerchantContextProvider>
                <LoginContextProvider>
                    <Component {...pageProps} />
                </LoginContextProvider>
            </MerchantContextProvider>
        </ProductsContextProvider>
    );
}

export default MyApp;
