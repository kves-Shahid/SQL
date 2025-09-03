
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';


export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Expect format: "Bearer <token>"

    if (!token) {
      return res.status(401).json({ error: 'Authentication token missing' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');

    // Determine table and primary key
    const table = decoded.role === 'student' ? 'student' : 'instructor';
    const key = decoded.role === 'student' ? 'student_id' : 'instructor_id';

    // Fetch user from database
    const [userRows] = await pool.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [decoded.id]);

    if (!userRows.length) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach user info to request
    req.user = userRows[0];
    req.user.role = decoded.role;

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Role-based authorization middleware.
 * Example usage: authorizeRoles('instructor', 'admin')
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }
    next();
  };
};

/**
 * Shortcut middleware for instructor-only routes
 */
export const authorizeInstructor = authorizeRoles('instructor');

/**
 * Shortcut middleware for student-only routes
 */
export const authorizeStudent = authorizeRoles('student');
