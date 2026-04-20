import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage";

function getRouteErrorContent(error) {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return {
        title: "Page not found",
        description:
          "The page you are looking for does not exist or the link may be outdated.",
        error: error.statusText || "This route could not be found.",
      };
    }

    return {
      title: "We could not load this page",
      description:
        "Something interrupted this route. Please go back or return to the homepage.",
      error:
        error.data?.message ||
        error.statusText ||
        `Request failed with status ${error.status}.`,
    };
  }

  if (error instanceof Error) {
    return {
      title: "Something went wrong",
      description:
        "A problem stopped this screen from rendering properly, but the rest of CityLink is still available.",
      error: error.message,
    };
  }

  return {
    title: "Page not available",
    description: "This page is unavailable right now.",
    error: "Please try again or return to the homepage.",
  };
}

export function RouteErrorBoundary() {
  const routeError = useRouteError();
  const content = getRouteErrorContent(routeError);

  return <ErrorMessage {...content} fullPage />;
}

const ErrorPage = ({ embedded = false }) => {
  return (
    <ErrorMessage
      fullPage
      embedded={embedded}
      title="Page not found"
      description="The page you tried to open does not exist or has been moved."
      error="Check the URL or head back to the CityLink homepage."
    />
  );
};

export default ErrorPage;
