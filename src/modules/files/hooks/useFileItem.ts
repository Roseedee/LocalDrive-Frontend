import { useFileStore } from "../store/file.store"
import type { ItemProps } from "../models/file.model"

export function useFileItem(file: ItemProps, onOpen?: (f: ItemProps) => void) {
  const { selectedIds, selectOne, toggleSelect } = useFileStore()

  const isSelected = selectedIds.includes(file.id)

  const onClick = (e: React.MouseEvent) => {
    // console.log("handleOnFileClick")
    if (e.ctrlKey || e.metaKey) {
      toggleSelect(file.id)
    } else {
      selectOne(file.id)
    }
  }

  const onDoubleClick = () => {
    // console.log("handleOnFileDoubleClick")
    onOpen?.(file)
  }

  return {
    isSelected,
    onClick,
    onDoubleClick,
  }
}