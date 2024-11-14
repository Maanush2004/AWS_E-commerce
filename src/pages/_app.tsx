import { ProductsContextProvider } from "../../components/ProductsContext";
import { MerchantContextProvider } from "../../components/MerchantContext";
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ProductsContextProvider>
            <MerchantContextProvider>
                <Component {...pageProps} />
            </MerchantContextProvider>
        </ProductsContextProvider>
    );
}

export default MyApp;
