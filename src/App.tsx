import { useState, useEffect } from "react";
import { useMDConnection } from "./useMDConnection";
import { DuckDBRow } from "@motherduck/wasm-client";

function App() {
    const { connection, connect } = useMDConnection();
    const [displayData, setDisplayData] = useState<DuckDBRow[]>([]);
    const [colNames, setColNames] = useState<string[]>([]);

    useEffect(() => {
        connect();
    }, [connect]);

    const clickHandler = () => {
        async function fetchData() {
            if (connection === null) {
                return;
            }
            const result = await connection.evaluateQuery(
                "show all databases;"
            );
            const rowData = result.data.toRows();
            setDisplayData([...rowData]);
            setColNames(Object.keys(rowData[0]));
        }
        fetchData().catch(console.error);
    };

    return (
        <div className="">
            {!connection ? (
                <>Loading...</>
            ) : (
                <>
                    <button onClick={clickHandler}>Click me</button>
                    <table>
                        <thead>
                            <tr>
                                {colNames.length > 0 &&
                                    colNames.map((val, i) => (
                                        <th key={i}>{val}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {displayData.length > 0 &&
                                displayData.map((row, i) => (
                                    <tr key={i}>
                                        {colNames.map((val, i) => (
                                            <td key={i}>{String(row[val])}</td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default App;
