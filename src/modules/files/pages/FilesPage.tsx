import { useAuthStore } from "@/modules/auth/store/auth.store";

export default function FilesPage() {
  const { user_id, device_name } = useAuthStore();

  return (
    <div>
      <h1>Files</h1>
      <p>This is the Files page.</p>
      <p>User ID: {user_id}</p>
      <p>Device Name: {device_name}</p>
    </div>
  );
}