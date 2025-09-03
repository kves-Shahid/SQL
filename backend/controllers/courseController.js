import * as CourseModel from '../models/courseModel.js';

export const createCourse = async (req, res) => {
  const { instructor_id, title, description, category, language, price, status = 'draft' } = req.body;

  try {
    const id = await CourseModel.createCourse(instructor_id, title, description, category, language, price, status);
    res.status(201).json({ msg: 'Course created', course_id: id });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create course', error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  const { course_id } = req.params;
  const { title, description, category, language, price, status } = req.body;

  try {
    await CourseModel.updateCourse(course_id, title, description, category, language, price, status);
    res.json({ msg: 'Course updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Update failed', error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { course_id } = req.params;

  try {
    await CourseModel.deleteCourse(course_id);
    res.json({ msg: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Delete failed', error: err.message });
  }
};

export const getAllCourses = async (_req, res) => {
  try {
    const rows = await CourseModel.fetchPublishedCourses();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to retrieve courses', error: err.message });
  }
};

export const getCourseById = async (req, res) => {
  const { course_id } = req.params;

  try {
    const course = await CourseModel.fetchCourseById(course_id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};
