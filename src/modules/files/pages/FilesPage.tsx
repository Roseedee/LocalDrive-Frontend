import { useAuthStore } from "@/modules/auth/store/auth.store";

export default function FilesPage() {
  const { user_id, device_name } = useAuthStore();

  const handleSetExpired = () => {
    useAuthStore.getState().expireSession();
  }

  return (
    <div className="content">
      <h1>Files</h1>
      <p>This is the Files page.</p>
      <p>User ID: {user_id}</p>
      <p>Device Name: {device_name}</p>
      <a href="/logout">Logout</a>
      <div>
        {/* <div className="loading-overlay">
          <div className="spinner"></div>
          <span className="loading-text">กำลังโหลด</span>
        </div> */}
      </div>

      <button onClick={handleSetExpired} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        set expired
      </button>
    </div>

  );
}