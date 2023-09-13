import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.body.user.role;

  if (userRole === "admin") {
    // User has admin role, allow access to the route
    next();
  } else {
    // User does not have admin role,
    // deny access with a 403 Forbidden response
    res.status(403).json({
      message: "Access denied: You must be an admin to access this resource",
    });
  }
};

export default isAdmin;
