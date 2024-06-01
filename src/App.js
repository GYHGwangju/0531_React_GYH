import './App.css';

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from "./pages/Home";
import YoungerOrder from "./pages/YoungerOrder";
import UsingAI from "./pages/UsingAI";
import NotFoundPage from "./pages/NotFoundPage";
import SearchOrder from "./pages/AI_search/SearchOrder";
import SearchV2 from "./pages/AI_search/Search_ver2";
import Purchase from "./pages/Purchase";
import Payment from "./pages/AI_search/Payment";
import OrderComplete from "./pages/AI_search/OrderComplete";
import WebSocketTest from "./pages/test/WebSocketTest";
import WebSocketTest2 from "./pages/test/WebSocketTest2";
import WebSocketTest3 from "./pages/test/WebSocketTest3";
import AudioStreaming from "./pages/test/AudioStreaming";
import Tts from "./pages/test/Tts";
import AudioStreaming2 from "./pages/test/AudioStreamingTest";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "search",
            element: <SearchV2 />
        },
        {
            path: "search-order",
            element: <SearchOrder />
        },
        // {
        //     path: "olderorder",
        //     element: <OlderOrder />,
        // },
        {
            path: "youngerorder",
            element: <YoungerOrder />,
        },
        {
            path: "usingai",
            element: <UsingAI />,
        },
        {
            path: "purchase",
            element: <Purchase />,
        },
        {
            path: "payment",
            element: <Payment />,
        },
        {
            path: "order-complete",
            element: <OrderComplete />,
        },
        {
            path: "test/websocket",
            element: <WebSocketTest />,
        },
        {
            path: "test/websocket/v2",
            element: <WebSocketTest2 />,
        },
        {
            path: "test/websocket/v3",
            element: <WebSocketTest3 />,
        },
        {
            path: "test/websocket/v4",
            element: <AudioStreaming />,
        },
        {
            path: "test/websocket/v5",
            element: <AudioStreaming2 />,
        },
        {
            path: "test/tts",
            element: <Tts />,
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;