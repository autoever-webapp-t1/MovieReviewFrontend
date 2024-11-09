import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // SSE 연결 설정
    const eventSource = new EventSource("http://localhost:8080/api/events");

    // 메시지 수신 처리
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    // 연결 에러 처리
    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      eventSource.close();
    };
  }, []);

  return <div>asdf</div>;
}

export default App;
