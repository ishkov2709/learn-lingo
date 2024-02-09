import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/user/thunk";
import Link from "next/link";

export interface PageProps {}

export default function ProfileSubmenu() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div>
      <ul>
        <li>
          <Link href="/favorite">Favorite Teachers</Link>
        </li>
        <li>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
