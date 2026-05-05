import { Overlay } from "./Overlay";
import "../styles/fileFullViewPopup.css";

import { useFileStore } from "../store/file.store";
import { useFileContent } from "@/shared/lib/useFileContent";

import closeIcon from '@/assets/icons/close.png';
import arrowIcon from '@/assets/icons/arrow.png';
import unknownFileIcon from '@/assets/icons-file/unknown.png';

// import imgTest from '@/assets/test/test7.jpg';

type FileFullViewPopupProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export default function FileFullViewPopup({ onPrevious, onNext }: FileFullViewPopupProps) {
  const isFullViewOpen = useFileStore((s) => s.isFullViewOpen);
  const closeFullView = useFileStore((s) => s.closeFullView);
  const activeFile = useFileStore((s) => s.activeFile);

  const type = activeFile?.fileType || "";

  const isImage = type.startsWith("image/");
  const isVideo = type.startsWith("video/");
  const isAudio = type.startsWith("audio/");

  const shouldLoad = isImage || isVideo || isAudio;

  const { url, loading } = useFileContent(
    shouldLoad ? activeFile?.id : undefined
  );



  return (
    <>
      <Overlay open={isFullViewOpen} onClose={closeFullView}>
        <div className="file-fullview-header">
          <div className="row between">
            <div className="file-path">
              <a href='/files'>เครื่องนี้</a>
              /
              <a href='/files/folder1'>โฟลเดอร์ 1</a>
              /
              <a>{activeFile?.name}</a>
            </div>
          </div>
          <div className="popup-close-btn" onClick={closeFullView}>
            <img src={closeIcon} alt="Close" />
          </div>
        </div>
        <div className="img-container" onClick={closeFullView}>
          <div className="btn-change prev" onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}>
            <img src={arrowIcon} alt="Previous" />
          </div>
          {
            loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : isImage ? (
              <img
                key={activeFile?.id}
                src={url ?? unknownFileIcon}
                draggable={false}
                className="img"
                onClick={(e) => e.stopPropagation()}
              />
            ) : isVideo ? (
              <video
                key={activeFile?.id}
                src={url ?? ""}
                controls
                draggable={false}
                className="img"
                onClick={(e) => e.stopPropagation()}
              />
            ) : isAudio ? (
              <div className="audio-container" onClick={(e) => e.stopPropagation()}>
                <img src={unknownFileIcon} className="audio-cover" />
                <audio key={activeFile?.id} src={url ?? ""} controls />
              </div>
            ) : (
              <img
                src={unknownFileIcon}
                className="img"
                draggable={false}
                onClick={(e) => e.stopPropagation()}
              />
            )
          }
          <div className="btn-change next" onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}>
            <img src={arrowIcon} alt="Next" />
          </div>
        </div>
      </Overlay>
    </>
  );
}