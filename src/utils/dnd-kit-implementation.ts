/**
 * Calyra Drag-and-Drop Implementation Guide
 * 
 * ISSUE FIXED: Drag-and-drop was not working due to incorrect prop names
 * passed to DndContext from useTimetableDragDrop hook.
 * 
 * LIBRARY: dnd-kit v6.3.1 (Modern, actively maintained drag-drop library)
 * - Framework agnostic architecture
 * - Built-in support for multiple input methods (pointer, touch, keyboard)
 * - Fully customizable and accessibility-first
 * - Performance optimized with 60fps animations
 * 
 * ROOT CAUSE:
 * The useTimetableDragDrop hook was returning:
 *   { sensors, handleDragStart, handleDragEnd, activeDragCourse }
 * 
 * But DndContext expects prop names:
 *   { sensors, onDragStart, onDragEnd, collisionDetection }
 * 
 * FIXES APPLIED:
 * 
 * 1. Fixed Hook Return Values (useTimetableDragDrop.ts)
 *    Changed from:
 *      return { sensors, handleDragStart, handleDragEnd, activeDragCourse }
 *    To:
 *      return { sensors, onDragStart: handleDragStart, onDragEnd: handleDragEnd, activeDragCourse }
 * 
 * 2. Added Collision Detection (TimetablePage.tsx)
 *    - Added `pointerWithin` collision detection algorithm
 *    - This is essential for DndContext to detect valid drop targets
 *    - Passed to DndContext: <DndContext {...dragDrop} collisionDetection={pointerWithin}>
 * 
 * ARCHITECTURE:
 * 
 * CourseList (Draggable Source)
 *   └─ DraggableCourseItem
 *       └─ useDraggable({
 *           id: "course-{courseId}",
 *           data: { type: "course", course, ... }
 *         })
 * 
 * TimetableGrid (Drop Target)
 *   └─ DroppableSlot
 *       └─ useDroppable({
 *           id: slotKey,
 *           data: { day, time }
 *         })
 * 
 * DndContext (Main Orchestrator)
 *   ├─ sensors: [PointerSensor, TouchSensor, KeyboardSensor]
 *   ├─ collisionDetection: pointerWithin
 *   ├─ onDragStart: Tracks active drag course
 *   ├─ onDragEnd: Validates and assigns course to slot
 *   └─ DragOverlay: Renders drag preview
 * 
 * DRAG FLOW:
 * 
 * 1. User initiates drag on CourseList item
 *    └─ PointerSensor or TouchSensor activates after 8px distance (pointer)
 *                                         or 250ms delay (touch)
 * 
 * 2. onDragStart fires
 *    └─ Sets activeDragCourse state for DragOverlay preview
 * 
 * 3. User drags over TimetableGrid slots
 *    └─ collisionDetection detects if hovering over drop target
 *    └─ Slot highlight shows drop zone is valid (isOver state)
 * 
 * 4. User releases (drop)
 *    └─ onDragEnd validates:
 *       - Source slot differs from target slot
 *       - Course still exists
 *       - Valid drop target
 *    └─ Calls assignCourse(targetSlotKey, { courseId, classroom })
 *    └─ Updates timetable with new assignment
 * 
 * KEY BEST PRACTICES IMPLEMENTED:
 * 
 * ✅ Proper event handler naming (onDragStart/onDragEnd)
 * ✅ Collision detection algorithm specified
 * ✅ Data validation on drop
 * ✅ Toast notifications for user feedback
 * ✅ Proper sensor configuration (distance constraints)
 * ✅ Visual feedback with DragOverlay
 * ✅ Touch-friendly activation delay
 * ✅ Keyboard support included
 * ✅ Reduced opacity on drag for visual clarity
 * ✅ Type-safe event data handling
 * 
 * TESTING NOTES:
 * - Desktop: Click and drag course cards to grid slots
 * - Tablet: Long-press (250ms) and drag course cards
 * - Keyboard: Tab to course → Enter → Arrow keys to move → Enter to drop
 * - All platforms should show smooth 60fps animations
 * 
 * ALTERNATIVE LIBRARIES (Not chosen):
 * - react-beautiful-dnd: Maintained mode, less flexible
 * - react-dnd: Older, more complex setup, declining usage
 * 
 * dnd-kit chosen because:
 * - Modern headless architecture
 * - Framework agnostic core
 * - Active development and maintenance
 * - Best accessibility support
 * - Smallest bundle size (~8KB)
 * - 16.9k+ GitHub stars
 */

export const DND_KIT_CONFIG = {
  version: "6.3.1",
  sensors: ["PointerSensor", "TouchSensor", "KeyboardSensor"],
  collisionDetection: "pointerWithin",
  lastUpdated: "2026-04-02",
} as const;
