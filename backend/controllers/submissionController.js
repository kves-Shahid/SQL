import * as SubmissionModel from '../models/submissionModel.js';
import * as AssignmentModel from '../models/assignmentModel.js';


 //Student submits an assignment
 
export const submitAssignment = async (req, res) => {
  const { assignment_id, student_id, content_url } = req.body;

  try {
    const assignment = await AssignmentModel.getAssignmentById(assignment_id);
    if (!assignment) return res.status(400).json({ msg: 'Assignment does not exist' });

    const exists = await SubmissionModel.checkSubmissionExists(assignment_id, student_id);
    if (exists) return res.status(400).json({ msg: 'Submission already exists' });

    await SubmissionModel.insertSubmission(assignment_id, student_id, content_url);
    res.status(201).json({ msg: 'Assignment submitted' });
  } catch (err) {
    res.status(500).json({ msg: 'Submit failed', error: err.message });
  }
};


 //Get submissions for an assignment (Teacher)
 
export const getSubmissionsByAssignment = async (req, res) => {
  const { assignment_id } = req.params;
  try {
    const submissions = await SubmissionModel.getSubmissionsByAssignment(assignment_id);
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};


 //Get all submissions of a student

export const getSubmissionsByStudent = async (req, res) => {
  const { student_id } = req.params;
  try {
    const submissions = await SubmissionModel.getSubmissionsByStudent(student_id);
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};


 // Get a specific student's submission for an assignment
 
export const getStudentSubmission = async (req, res) => {
  const { assignment_id, student_id } = req.params;

  try {
    const submissions = await SubmissionModel.getSubmissionsByAssignment(assignment_id);
    const studentSubmission = submissions.find(sub => sub.student_id == student_id);

    if (!studentSubmission) return res.status(404).json({ msg: 'Submission not found' });
    res.json(studentSubmission);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};
