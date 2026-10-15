import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { findDevice } from "../api/auth.api";

import computerIcon from "@/assets/icons/computer.png";

const knownDevices = ["Lab Computer", "MSI Laptop"];
const deviceTypes = [
  "คอมพิวเตอร์ตั้งโต๊ะ",
  "แล็ปท็อป",
  "แท็บเล็ต",
  "โทรศัพท์",
];

export default function CompareDevicePage() {
  const navigate = useNavigate();

  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isCreatingDevice, setIsCreatingDevice] = useState(false);

  useEffect(() => {
    const fetchDevice = async () => {
      const res = await findDevice();
      console.log(res);
    }

    fetchDevice();

  }, [])

  const handleCreateDevice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/files");
  };

  const handleDeviceSelect = (device: string) => {
    setSelectedDevice((current) => (current === device ? null : device));
    setIsCreatingDevice(false);
  };

  const handlePrimaryAction = () => {
    if (selectedDevice) {
      navigate("/files");
      return;
    }

    setIsCreatingDevice(true);
  };

  return (
    <section
      className="auth-panel auth-panel-wide"
      aria-labelledby="compare-title"
      onClick={() => setSelectedDevice(null)}
    >
      <div className="device-compare-header">
        <h1 id="compare-title">เชื่อมกับเครื่องเดิม?</h1>
        <p>
          คุณสามารถใช้อุปกรณ์เดิมเพื่อเชื่อมข้อมูลและประวัติการใช้งานเดิมได้
        </p>
        <strong>
          ถ้าเลือกเป็นเครื่องเดิมระบบจะถือว่าเครื่องนี้และอุปกรณ์ที่เลือกคือเครื่องเดียวกัน
        </strong>
      </div>

      <div className="device-choice-list" onClick={(e) => e.stopPropagation()}>
        {knownDevices.map((device) => (
          <button
            key={device}
            type="button"
            className={`device-choice ${selectedDevice === device ? "active" : ""}`}
            onClick={() => handleDeviceSelect(device)}
          >
            <img src={computerIcon} alt="" />
            <span>{device}</span>
          </button>
        ))}
      </div>

      {isCreatingDevice && (
        <>
          <div className="auth-divider" />

          <form className="auth-form" onSubmit={handleCreateDevice}>
            <span className="auth-section-label">สร้างอุปกรณ์ใหม่</span>

            <select defaultValue="" aria-label="เลือกประเภทอุปกรณ์">
              <option value="" disabled>
                เลือกประเภทอุปกรณ์
              </option>
              {deviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <input type="text" placeholder="ตั้งชื่ออุปกรณ์" />

            <button type="submit" className="auth-primary-btn">
              ตกลง
            </button>
          </form>
        </>
      )}

      {!isCreatingDevice && (
        <button type="button" className="auth-primary-btn" onClick={handlePrimaryAction}>
          {selectedDevice ? "ตกลง" : "สร้างอุปกรณ์ใหม่"}
        </button>
      )}
    </section>
  );
}
