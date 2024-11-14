import Header from "@/widgets/header";
import { Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
}
