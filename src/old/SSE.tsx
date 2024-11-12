import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    // SSE 연결 설정
    const eventSource = new EventSource("http://localhost:8080/api/events");

    // 메시지 수신 처리
    eventSource.onmessage = (event) => {
      try {
        console.log(event.data);
        // const data = JSON.parse(event.data);
        // console.log(data);
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

  const onClick = async () => {
    console.log(text);
    await axios.post("http://localhost:8080/api/notify", text);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="서버로 받고 싶은 메시지"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={onClick}>메시지를 보내줘 !!</button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
