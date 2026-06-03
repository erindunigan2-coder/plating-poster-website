"use client";

import { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ProcessStep } from "@/lib/steps";
import { getGroupInfo } from "@/lib/steps";

type Props = {
  step: ProcessStep;
  instanceId: string;
  customName?: string;
  onRemove?: () => void;
  onRename?: (newName: string) => void;
  isToolbox?: boolean;
};

export default function StepTile({ step, instanceId, customName, onRemove, onRename, isToolbox }: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(customName ?? step.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: instanceId, data: { step } });

  const groupInfo = getGroupInfo(step.group);
  const color = groupInfo?.color ?? "#6B7080";
  const hasPosters = !!step.posterId;
  const displayName = customName ?? step.name;
  const isRenamed = customName && customName !== step.name;

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function startEdit(e: React.MouseEvent) {
    if (isToolbox) return;
    e.stopPropagation();
    e.preventDefault();
    setEditValue(displayName);
    setEditing(true);
  }

  function commitEdit() {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== step.name) {
      onRename?.(trimmed);
    } else if (!trimmed || trimmed === step.name) {
      // Reset to original
      onRename?.("");
    }
    setEditing(false);
  }

  function cancelEdit() {
    setEditValue(displayName);
    setEditing(false);
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    borderLeft: `3px solid ${color}`,
    background: "#fff",
    cursor: isToolbox ? "grab" : editing ? "text" : "grab",
  };

  // Split drag listeners from the name area so clicking the name edits instead of dragging
  const dragHandleProps = isToolbox ? { ...attributes, ...listeners } : {};
  const lineDragProps = !isToolbox && !editing ? { ...attributes, ...listeners } : { ...attributes };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...lineDragProps}
      className={`
        relative flex items-center gap-2 px-3 py-2 rounded shadow-sm
        border border-[#DDD9D0] select-none
        ${isDragging ? "shadow-lg ring-2 ring-amber-400/40" : "hover:shadow-md"}
      `}
      title={isToolbox ? step.description : editing ? "" : `Click name to rename \u2022 ${step.description}`}
      {...dragHandleProps}
    >
      {/* Step name — editable in the line */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitEdit();
                if (e.key === "Escape") cancelEdit();
              }}
              className="font-bold text-xs uppercase tracking-wide w-full px-1 py-0.5 border rounded outline-none"
              style={{ color: "#1A1F2E", borderColor: "#E8A020", background: "#FFFDF5" }}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          <span
            className={`font-bold text-xs uppercase tracking-wide block truncate ${!isToolbox ? "cursor-text hover:underline hover:decoration-dotted hover:decoration-amber-400" : ""}`}
            style={{ color: "#1A1F2E" }}
            onClick={!isToolbox ? startEdit : undefined}
            onPointerDown={!isToolbox ? (e) => e.stopPropagation() : undefined}
          >
            {displayName}
            {isRenamed && (
              <span className="normal-case tracking-normal font-normal ml-1" style={{ color: "#9098A8", fontSize: "0.6rem" }}>
                ({step.name})
              </span>
            )}
          </span>
        )}
        {!isToolbox && !editing && (
          <span className="text-xs block truncate" style={{ color: "#6B7080" }}>
            {step.description}
          </span>
        )}
      </div>

      {/* Edit hint icon (line only, not editing) */}
      {!isToolbox && !editing && (
        <button
          onClick={startEdit}
          onPointerDown={(e) => e.stopPropagation()}
          className="shrink-0 w-5 h-5 flex items-center justify-center rounded text-xs hover:bg-amber-50 transition-colors"
          style={{ color: "#9098A8" }}
          title="Rename this step"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M7 2l3 3-6.5 6.5H.5V8.5z" />
          </svg>
        </button>
      )}

      {/* Status badge */}
      {!isToolbox && !hasPosters && (
        <span
          className="shrink-0 text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{ background: "#FFF3D6", color: "#E8A020", fontSize: "0.6rem" }}
        >
          Soon
        </span>
      )}

      {/* Remove button */}
      {!isToolbox && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold hover:bg-red-100 transition-colors"
          style={{ color: "#E05C5C" }}
          title="Remove from line"
        >
          x
        </button>
      )}
    </div>
  );
}
