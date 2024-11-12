import Header from "@/widgets/header";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
