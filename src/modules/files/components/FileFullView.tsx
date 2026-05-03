import { Overlay } from "./Overlay";

import { useFileStore } from "../store/file.store";

export default function FileFullView() {
    const isFullViewOpen = useFileStore((s) => s.isFullViewOpen);
    const closeFullView = useFileStore((s) => s.closeFullView);

  return (
    <>
      <Overlay open={isFullViewOpen} onClose={closeFullView}>
        <h2>Image Full View</h2>
        <p>Hello world</p>
        <button onClick={closeFullView}>Close</button>
      </Overlay>
    </>
  );
}