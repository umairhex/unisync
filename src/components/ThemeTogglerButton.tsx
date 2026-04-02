import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

type ThemeMode = "light" | "dark" | "system";
type Direction = "btt" | "ttb" | "ltr" | "rtl";
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";

interface ThemeTogglerButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  modes?: ThemeMode[];
  direction?: Direction;
  onImmediateChange?: (theme: ThemeMode) => void;
}

/**
 * Theme Toggler Button
 * An animated button that toggles between light, dark, and system themes
 * with smooth directional transitions.
 */
export function ThemeTogglerButton({
  variant = "outline",
  size = "icon",
  modes = ["light", "dark"],
  direction = "ltr",
  onImmediateChange,
}: ThemeTogglerButtonProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    flushSync(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <Button variant={variant} size={size} className="cursor-wait">
        <div className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const nextThemeIndex = ((modes.indexOf((currentTheme as ThemeMode)) || 0) + 1) % modes.length;
  const nextTheme = modes[nextThemeIndex];

  const handleToggle = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    onImmediateChange?.(newTheme);
  };

  const getDirectionClass = () => {
    const baseClass = "transition-all duration-300";
    switch (direction) {
      case "btt": // bottom-to-top
        return `${baseClass} data-[active=true]:translate-y-[-100%] data-[active=true]:opacity-0`;
      case "ttb": // top-to-bottom
        return `${baseClass} data-[active=true]:translate-y-[100%] data-[active=true]:opacity-0`;
      case "rtl": // right-to-left
        return `${baseClass} data-[active=true]:translate-x-[-100%] data-[active=true]:opacity-0`;
      case "ltr": // left-to-right (default)
      default:
        return `${baseClass} data-[active=true]:translate-x-[100%] data-[active=true]:opacity-0`;
    }
  };

  const directionClass = getDirectionClass();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => handleToggle(nextTheme)}
      className="relative overflow-hidden"
      title={`Switch to ${nextTheme === "system" ? "system" : nextTheme} theme`}
    >
      <div className="relative h-[1.2rem] w-[1.2rem] inline-flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`h-[1.2rem] w-[1.2rem] absolute ${directionClass}`}
          data-active={currentTheme === "light"}
        />
        {/* Moon Icon */}
        <Moon
          className={`h-[1.2rem] w-[1.2rem] absolute ${directionClass}`}
          data-active={currentTheme === "dark"}
        />
      </div>
      <span className="sr-only">Toggle theme. Current theme: {currentTheme}</span>
    </Button>
  );
}
