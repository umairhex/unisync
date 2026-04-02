import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

/**
 * 404 Not Found Page
 * Displays when a user navigates to a route that doesn't exist
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-8xl sm:text-9xl font-bold bg-linear-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Page Not Found
          </h2>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-lg text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-muted-foreground">
            Let's get you back to scheduling your courses.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" size="lg" className="gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
