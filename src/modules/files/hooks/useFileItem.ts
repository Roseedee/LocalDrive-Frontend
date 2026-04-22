import { useToolsStore } from "../store/tools.store"
import { useFileStore } from "../store/file.store"
import type { ItemProps } from "../models/file.model"

export function useFileItem(file: ItemProps, onOpen?: (f: ItemProps) => void) {
  const isMultiSelectMode = useToolsStore((s) => s.isMultiSelectMode);
  const selectedIds = useFileStore((s) => s.selectedIds)
  const selectOne = useFileStore((s) => s.selectOne)
  const toggleSelect = useFileStore((s) => s.toggleSelect)

  const isSelected = selectedIds.includes(file.id)

  const onClick = (e: React.MouseEvent) => {
    // console.log("handleOnFileClick")
    if (e.ctrlKey || e.metaKey || isMultiSelectMode) {
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