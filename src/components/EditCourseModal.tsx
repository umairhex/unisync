import { useState } from "react";
import { Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Course } from "@/types";
import {
  validateCourseCode,
  validateCourseName,
  validateSection,
  validateCredits,
} from "@/utils/validation";
import { extractErrorMessage } from "@/utils/errorHandling";

interface EditCourseModalProps {
  course: Course;
  allCourses: Course[];
  onUpdateCourse: (courseId: string, updates: Partial<Omit<Course, "id">>) => void;
}

/**
 * Modal for editing course details
 * Allows updating code, name, section, credits, faculty, and classroom
 */
export function EditCourseModal({
  course,
  allCourses,
  onUpdateCourse,
}: EditCourseModalProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(course.code);
  const [name, setName] = useState(course.name);
  const [classSection, setClassSection] = useState(course.class);
  const [credits, setCredits] = useState(course.credits.toString());
  const [faculty, setFaculty] = useState(course.faculty || "");
  const [classroom, setClassroom] = useState(course.classroom || "");
  const [error, setError] = useState<string>("");

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Reset form when opening
      setCode(course.code);
      setName(course.name);
      setClassSection(course.class);
      setCredits(course.credits.toString());
      setFaculty(course.faculty || "");
      setClassroom(course.classroom || "");
      setError("");
    }
    setOpen(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const codeResult = validateCourseCode(code);
    if (!codeResult.isValid) {
      setError(codeResult.error!);
      return;
    }

    const nameResult = validateCourseName(name);
    if (!nameResult.isValid) {
      setError(nameResult.error!);
      return;
    }

    const sectionResult = validateSection(classSection);
    if (!sectionResult.isValid) {
      setError(sectionResult.error!);
      return;
    }

    const creditsResult = validateCredits(credits);
    if (!creditsResult.isValid) {
      setError(creditsResult.error!);
      return;
    }

    // Check for duplicate (excluding current course)
    const isDuplicate = allCourses.some(
      (c) =>
        c.id !== course.id &&
        c.code.toLowerCase() === code.trim().toUpperCase().toLowerCase() &&
        c.class.toLowerCase() === classSection.trim().toUpperCase().toLowerCase(),
    );

    if (isDuplicate) {
      setError("This course code and section combination already exists");
      return;
    }

    try {
      onUpdateCourse(course.id, {
        code: code.trim().toUpperCase(),
        name: name.trim(),
        class: classSection.trim().toUpperCase(),
        credits: Number.parseInt(credits, 10),
        faculty: faculty.trim() || undefined,
        classroom: classroom.trim() || undefined,
      });

      setOpen(false);
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 sm:h-6 sm:w-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-primary hover:text-primary hover:bg-primary/10"
          title="Edit course"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>Update the course details.</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-code" className="text-right">
                Code
              </Label>
              <Input
                id="edit-code"
                placeholder="CS101"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                placeholder="Introduction to Programming"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-class" className="text-right">
                Section
              </Label>
              <Input
                id="edit-class"
                placeholder="A"
                value={classSection}
                onChange={(e) => setClassSection(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-credits" className="text-right">
                Credits
              </Label>
              <Input
                id="edit-credits"
                type="number"
                min={0}
                max={6}
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-faculty" className="text-right">
                Faculty
              </Label>
              <Input
                id="edit-faculty"
                placeholder="Mr. John Doe (Optional)"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-classroom" className="text-right">
                Classroom
              </Label>
              <Input
                id="edit-classroom"
                placeholder="Building A, Room 101 (Optional)"
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
