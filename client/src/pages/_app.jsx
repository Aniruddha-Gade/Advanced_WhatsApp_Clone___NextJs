import "@/styles/globals.css";
import { StateProvider } from "../context/stateContext";
import Head from "next/head";
import reducer, { initialState } from "@/context/stateReducers";

export default function App({ Component, pageProps }) {
    return <StateProvider initialState={initialState} reducer={reducer} >
        <Head>
            <title>WhatsApp</title>
            <link rel='shortcut icon' href='/favicon.png' />
        </Head>
        <Component {...pageProps} />
    </StateProvider>


}