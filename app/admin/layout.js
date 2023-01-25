import "../../styles/globals.css";
import SideBar from "../../Components/Sidebar/SideBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decode } from "jsonwebtoken";

export default async function AdminLayout({ children }) {
  const cookiesList = cookies();
  const authCookie = cookiesList.get("auth");
  let jwtDecoded;
  let username;
  if (authCookie) {
    const { value } = authCookie;
    jwtDecoded = decode(value);
    username = jwtDecoded.username;
  }
  if (!authCookie) {
    redirect("/login");
  }
  return (
    <section>
      {" "}
      <SideBar username={username} />
      {children}
    </section>
  );
}
