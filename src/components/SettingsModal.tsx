import { useState } from "react";
import { Settings, AlertCircle, Github, Linkedin, Mail, Globe, Twitter, Instagram } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TimetableSettings, TimetableData } from "@/types";
import { DEFAULT_SETTINGS } from "@/types";

interface SettingsModalProps {
  settings: TimetableSettings;
  timetable: TimetableData;
  onSave: (settings: TimetableSettings) => void;
}

export function SettingsModal({ settings, timetable, onSave }: SettingsModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TimetableSettings>(settings);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasTimetableAssignments = Object.keys(timetable).length > 0;
  const settingsChanged =
    formData.startTime !== settings.startTime ||
    formData.endTime !== settings.endTime ||
    formData.intervalMinutes !== settings.intervalMinutes;

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setFormData(settings);
    }
    setOpen(isOpen);
  };

  const handleChange = (field: keyof TimetableSettings, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const [startH, startM] = formData.startTime.split(":").map(Number);
    const [endH, endM] = formData.endTime.split(":").map(Number);
    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;

    if (startMins >= endMins) {
      toast.error("Start time must be before end time");
      return;
    }

    const duration = endMins - startMins;
    const slotCount = duration / formData.intervalMinutes;

    if (slotCount > 48) {
      toast.error("Too many time slots! Please increase the interval or shorten the time range.");
      return;
    }

    if (hasTimetableAssignments && settingsChanged) {
      setShowConfirm(true);
    } else {
      onSave(formData);
      setOpen(false);
    }
  };

  const handleConfirmedSave = () => {
    onSave(formData);
    setShowConfirm(false);
    setOpen(false);
  };

  const handleReset = () => {
    setFormData(DEFAULT_SETTINGS);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            <span className="sr-only">Settings</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings & About</DialogTitle>
            <DialogDescription>
              Configure your timetable or learn about Calyra.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startTime" className="text-right">
                    Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleChange("startTime", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endTime" className="text-right">
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleChange("endTime", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="interval" className="text-right">
                    Interval
                  </Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <Input
                      id="interval"
                      type="number"
                      min="10"
                      max="180"
                      value={formData.intervalMinutes}
                      onChange={(e) => handleChange("intervalMinutes", parseInt(e.target.value) || 60)}
                    />
                    <span className="text-sm text-muted-foreground">min</span>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" className="mr-3" onClick={handleReset}>
                  Reset to Default
                </Button>
                <Button onClick={handleSave}>Save changes</Button>
              </DialogFooter>
            </TabsContent>

            <TabsContent value="about" className="space-y-4 py-4">
              <div className="space-y-4">
                {/* About Calyra Section */}
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <h3 className="font-semibold text-base mb-2">About Calyra</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Smart course scheduling system with drag-drop, conflict prevention, and export to calendar.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                    <span className="font-medium">Live:</span>
                    <a 
                      href="https://calyra.umairrx.dev" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors underline"
                    >
                      calyra.umairrx.dev
                    </a>
                  </p>
                </div>

                {/* Developer Section */}
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-foreground">Developer</h4>
                  <p className="text-sm font-medium text-foreground mb-4">UmairHex</p>
                  
                  {/* Social Links Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://umairrx.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-muted/50 hover:bg-muted hover:text-primary transition-all text-sm"
                    >
                      <Globe className="h-4 w-4 flex-shrink-0" />
                      <span>Portfolio</span>
                    </a>
                    <a
                      href="mailto:umairniazidev@gmail.com"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-muted/50 hover:bg-muted hover:text-primary transition-all text-sm"
                    >
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span>Email</span>
                    </a>
                    <a
                      href="https://github.com/umairhex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-muted/50 hover:bg-muted hover:text-primary transition-all text-sm"
                    >
                      <Github className="h-4 w-4 flex-shrink-0" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/umairhex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-muted/50 hover:bg-muted hover:text-primary transition-all text-sm"
                    >
                      <Linkedin className="h-4 w-4 flex-shrink-0" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://twitter.com/umairhex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-muted/50 hover:bg-muted hover:text-primary transition-all text-sm"
                    >
                      <Twitter className="h-4 w-4 flex-shrink-0" />
                      <span>Twitter</span>
                    </a>
                    <a
                      href="https://www.instagram.com/umairhex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-muted/50 hover:bg-muted hover:text-primary transition-all text-sm"
                    >
                      <Instagram className="h-4 w-4 flex-shrink-0" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-secondary-foreground" />
              Settings Change Impact
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>You have {Object.keys(timetable).length} course assignments in your timetable.</p>
              <p className="font-medium">
                Changing the time slot interval may affect your existing assignments.
              </p>
              <p>
                Your assignments will be automatically migrated to the closest matching time slots
                in the new schedule.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirm(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmedSave}
              className="bg-primary hover:bg-primary/90"
            >
              Apply Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
