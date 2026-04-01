import { useAuthStore } from "@/modules/auth/store/auth.store";
import { sessionStorage } from "@/shared/lib/sessionStorage";
import type { SessionModel } from "@/modules/auth/model/session.model";

export default function FilesPage() {
  // const { user_id, device_name } = useAuthStore();
  const session = sessionStorage.get<SessionModel>("session");

  return (
    <div className="content">
      <h1>Files</h1>
      <p>This is the Files page.</p>
      <p>User ID: {session?.user_id}</p>
      <p>Device Name: {session?.device_name}</p>
      <a href="/logout">Logout</a>
    </div>
  );
}