import { MDConnection } from "@motherduck/wasm-client";
import { useCallback, useState } from "react";

export function useMDConnection() {
    const [connection, setConnection] = useState<MDConnection | null>(null);
    const connect = useCallback(() => {
        console.log('first')
        if (!connection) {
            setConnection(
                MDConnection.create({
                    mdToken: import.meta.env.VITE_MOTHERDUCK_TOKEN,
                })
            );
        } else {
            console.warn("Connection to MotherDuck exists!");
        }
    }, [connection]);
    return { connection, connect };
}
