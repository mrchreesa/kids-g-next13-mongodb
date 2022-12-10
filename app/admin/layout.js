import "../../styles/globals.css";
import SideBar from "../../Components/Sidebar/SideBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const cookiesList = cookies();
  const authCookie = cookiesList.get("auth");
  if (!authCookie) {
    redirect("/login");
  }
  return (
    <section>
      {" "}
      <SideBar />
      {children}
    </section>
  );
}
