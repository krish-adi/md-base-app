import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <p>Count: {count}</p>
        </div>
    );
}

export default App;
