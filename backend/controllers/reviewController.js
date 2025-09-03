
import * as ReviewModel from '../models/reviewModel.js';

export const submitReview = async (req, res) => {
  const { student_id, course_id, rating, comment } = req.body;

  try {
    await ReviewModel.createReview(course_id, student_id, rating, comment);
    res.status(201).json({ msg: 'Review submitted' });
  } catch (err) {
    res.status(500).json({ msg: 'Submission failed', error: err.message });
  }
};

export const getReviewsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const reviews = await ReviewModel.getReviewsForCourse(courseId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};
