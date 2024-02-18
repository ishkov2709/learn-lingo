import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TokenValue } from "../register/page";
import FavoritesList from "@/components/favorites-list";
import styles from "../teachers/styles.module.css";

export default function Page() {
  const { value } = (cookies().get("user-token") ?? {
    value: null,
  }) as TokenValue;

  if (!value) return redirect("/");

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className="container">
          <FavoritesList />
        </div>
      </section>
    </main>
  );
}
