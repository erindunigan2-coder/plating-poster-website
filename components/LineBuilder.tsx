"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { STEPS, CHEMISTRY_GROUPS, getStepsByGroup, type ProcessStep, type ChemistryGroup } from "@/lib/steps";
import StepTile from "./StepTile";

const amber = "#E8A020";
const gunmetal = "#1A1F2E";

type LineStep = {
  instanceId: string;
  step: ProcessStep;
  customName?: string;
};

type Props = {
  onLineChange?: (steps: LineStep[]) => void;
};

export default function LineBuilder({ onLineChange }: Props) {
  const [lineSteps, setLineSteps] = useState<LineStep[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Set<ChemistryGroup>>(new Set(["cleaning-prep", "rinse-dry"]));
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStep, setActiveStep] = useState<ProcessStep | null>(null);
  const [nextId, setNextId] = useState(1);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Notify parent whenever lineSteps changes (avoids setState-during-render)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onLineChange?.(lineSteps);
  }, [lineSteps, onLineChange]);

  // Toggle a toolbox group
  const toggleGroup = (groupId: ChemistryGroup) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  // Add a step to the line (from toolbox click)
  const addStep = useCallback((step: ProcessStep) => {
    setLineSteps((prev) => {
      const newStep: LineStep = { instanceId: `line-${nextId}`, step };
      return [...prev, newStep];
    });
    setNextId((n) => n + 1);
  }, [nextId]);

  // Remove a step from the line
  const removeStep = useCallback((instanceId: string) => {
    setLineSteps((prev) => prev.filter((s) => s.instanceId !== instanceId));
  }, []);

  // Rename a step in the line
  const renameStep = useCallback((instanceId: string, newName: string) => {
    setLineSteps((prev) =>
      prev.map((s) =>
        s.instanceId === instanceId
          ? { ...s, customName: newName || undefined }
          : s
      )
    );
  }, []);

  // Clear entire line
  const clearLine = useCallback(() => {
    setLineSteps([]);
  }, []);

  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current as { step?: ProcessStep } | undefined;
    if (data?.step) setActiveStep(data.step);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveStep(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLineSteps((prev) => {
      const oldIndex = prev.findIndex((s) => s.instanceId === active.id);
      const newIndex = prev.findIndex((s) => s.instanceId === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  // Filter steps by search
  const filteredSteps = searchQuery.trim()
    ? STEPS.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.nameEs.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  // Count available vs coming-soon posters in the line
  const availableCount = lineSteps.filter((ls) => ls.step.posterId).length;
  const comingSoonCount = lineSteps.length - availableCount;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* ── Left: Toolbox ─────────────────────────────────────────────── */}
        <div className="lg:w-80 shrink-0">
          <div className="sticky top-20">
            <div className="mb-3">
              <h3
                className="font-black uppercase text-sm tracking-widest mb-2"
                style={{ color: gunmetal }}
              >
                Step Library
              </h3>
              <p className="text-xs mb-3" style={{ color: "#6B7080" }}>
                Click a step to add it to your line. Add the same step multiple times if needed.
              </p>
              {/* Search */}
              <input
                type="text"
                placeholder="Search steps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded"
                style={{ borderColor: "#DDD9D0", background: "#fff", color: gunmetal }}
              />
            </div>

            <div
              className="overflow-y-auto pr-1"
              style={{ maxHeight: "calc(100vh - 220px)" }}
            >
              {/* Search results */}
              {filteredSteps ? (
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#6B7080" }}>
                    {filteredSteps.length} result{filteredSteps.length !== 1 ? "s" : ""}
                  </p>
                  {filteredSteps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => addStep(step)}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded border text-sm hover:shadow-md transition-shadow"
                      style={{
                        borderColor: "#DDD9D0",
                        borderLeft: `3px solid ${CHEMISTRY_GROUPS.find((g) => g.id === step.group)?.color ?? "#6B7080"}`,
                        background: "#fff",
                      }}
                    >
                      <span className="font-bold text-xs uppercase tracking-wide flex-1 truncate" style={{ color: gunmetal }}>
                        {step.name}
                      </span>
                      <span className="text-xs shrink-0" style={{ color: amber }}>+ Add</span>
                    </button>
                  ))}
                </div>
              ) : (
                /* Grouped toolbox */
                <div className="space-y-1">
                  {CHEMISTRY_GROUPS.map((group) => {
                    const groupSteps = getStepsByGroup(group.id);
                    const isExpanded = expandedGroups.has(group.id);
                    return (
                      <div key={group.id}>
                        <button
                          onClick={() => toggleGroup(group.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:bg-white/60 transition-colors"
                        >
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: group.color }}
                          />
                          <span className="font-bold text-xs uppercase tracking-wider flex-1" style={{ color: gunmetal }}>
                            {group.label}
                          </span>
                          <span className="text-xs font-mono" style={{ color: "#6B7080" }}>
                            {groupSteps.length}
                          </span>
                          <span className="text-xs" style={{ color: "#6B7080" }}>
                            {isExpanded ? "−" : "+"}
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="ml-4 space-y-1 mb-2">
                            {groupSteps.map((step) => (
                              <button
                                key={step.id}
                                onClick={() => addStep(step)}
                                className="w-full text-left flex items-center gap-2 px-3 py-1.5 rounded border text-sm hover:shadow-sm transition-shadow"
                                style={{
                                  borderColor: "#EDE9E0",
                                  borderLeft: `3px solid ${group.color}`,
                                  background: "#fff",
                                  fontSize: "0.75rem",
                                }}
                              >
                                <span className="font-bold uppercase tracking-wide flex-1 truncate" style={{ color: gunmetal }}>
                                  {step.name}
                                </span>
                                {!step.posterId && (
                                  <span
                                    className="shrink-0 font-bold uppercase tracking-wider px-1 py-0.5 rounded"
                                    style={{ background: "#FFF3D6", color: "#E8A020", fontSize: "0.55rem" }}
                                  >
                                    Soon
                                  </span>
                                )}
                                <span className="text-xs shrink-0" style={{ color: amber }}>+</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: The Line ───────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3
                className="font-black uppercase text-sm tracking-widest"
                style={{ color: gunmetal }}
              >
                Your Line
              </h3>
              <p className="text-xs" style={{ color: "#6B7080" }}>
                {lineSteps.length === 0
                  ? "Add steps from the library to build your process line"
                  : `${lineSteps.length} step${lineSteps.length !== 1 ? "s" : ""} — drag to reorder`}
              </p>
            </div>
            {lineSteps.length > 0 && (
              <button
                onClick={clearLine}
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded border hover:bg-red-50 transition-colors"
                style={{ color: "#E05C5C", borderColor: "#E05C5C" }}
              >
                Clear All
              </button>
            )}
          </div>

          {lineSteps.length === 0 ? (
            /* Empty state */
            <div
              className="flex flex-col items-center justify-center py-20 rounded-lg border-2 border-dashed"
              style={{ borderColor: "#DDD9D0", background: "#FAFAF8" }}
            >
              <div className="text-4xl mb-3" style={{ color: "#DDD9D0" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-bold text-sm uppercase tracking-wider mb-1" style={{ color: "#6B7080" }}>
                Build your process line
              </p>
              <p className="text-xs text-center max-w-xs" style={{ color: "#9098A8" }}>
                Click steps from the library on the left to add them here.
                Arrange them in the order your shop runs — left to right, tank by tank.
              </p>
            </div>
          ) : (
            /* Line with sortable steps */
            <div>
              <SortableContext
                items={lineSteps.map((s) => s.instanceId)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {lineSteps.map((ls, index) => (
                    <div key={ls.instanceId} className="flex items-center gap-2">
                      {/* Step number */}
                      <span
                        className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-black"
                        style={{ background: gunmetal, color: amber }}
                      >
                        {index + 1}
                      </span>
                      {/* Arrow connector */}
                      {index < lineSteps.length - 1 && (
                        <div
                          className="absolute left-3 mt-8 w-px h-2"
                          style={{ background: "#DDD9D0" }}
                        />
                      )}
                      <div className="flex-1">
                        <StepTile
                          step={ls.step}
                          instanceId={ls.instanceId}
                          customName={ls.customName}
                          onRemove={() => removeStep(ls.instanceId)}
                          onRename={(newName) => renameStep(ls.instanceId, newName)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SortableContext>

              {/* Line summary */}
              <div
                className="mt-6 p-4 rounded-lg border"
                style={{ background: "#FAFAF8", borderColor: "#DDD9D0" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase tracking-widest" style={{ color: gunmetal }}>
                    Line Summary
                  </span>
                  <span className="font-black text-lg" style={{ color: gunmetal }}>
                    {lineSteps.length} poster{lineSteps.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {comingSoonCount > 0 && (
                  <p className="text-xs" style={{ color: "#E8A020" }}>
                    {availableCount} available now &middot; {comingSoonCount} coming soon
                  </p>
                )}
                {availableCount === lineSteps.length && lineSteps.length > 0 && (
                  <p className="text-xs" style={{ color: "#27AE60" }}>
                    All posters in this line are available
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeStep && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded shadow-lg border text-sm select-none"
            style={{
              borderLeft: `3px solid ${CHEMISTRY_GROUPS.find((g) => g.id === activeStep.group)?.color ?? "#6B7080"}`,
              background: "#fff",
              borderColor: "#DDD9D0",
            }}
          >
            <span className="font-bold text-xs uppercase tracking-wide" style={{ color: gunmetal }}>
              {activeStep.name}
            </span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
