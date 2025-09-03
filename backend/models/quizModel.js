import { pool } from '../config/db.js';

// Insert a new quiz
export const insertQuiz = async (module_id, title, total_marks, time_limit) => {
  const [result] = await pool.query(
    `INSERT INTO quiz (module_id, title, total_marks, time_limit, created_at)
     VALUES (?, ?, ?, ?, NOW())`,
    [module_id, title, total_marks, time_limit]
  );
  return result.insertId;
};

// Check if a student attempt exists
export const checkAttemptExists = async (quiz_id, student_id, attempt_no) => {
  const [rows] = await pool.query(
    `SELECT * FROM quiz_attempt WHERE quiz_id = ? AND student_id = ? AND attempt_no = ?`,
    [quiz_id, student_id, attempt_no]
  );
  return rows.length > 0;
};

// Submit a quiz attempt (stored procedure)
export const submitQuizAttempt = async (quiz_id, student_id, score, attempt_no) => {
  const [rows] = await pool.query(
    'CALL sp_submit_quiz_attempt(?, ?, ?, ?)',
    [quiz_id, student_id, score, attempt_no]
  );
  return rows;
};

// Get attempts by quiz ID
export const getAttemptsByQuizId = async (quiz_id) => {
  const [rows] = await pool.query(
    `SELECT qa.*, s.f_name, s.l_name 
     FROM quiz_attempt qa 
     JOIN student s ON qa.student_id = s.student_id 
     WHERE qa.quiz_id = ?`,
    [quiz_id]
  );
  return rows;
};

// Get quizzes for a module
export const fetchQuizzesByModule = async (module_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM quiz WHERE module_id = ?',
    [module_id]
  );
  return rows;
};


// Get quizzes by module (student)
export const getQuizzesByModule = async (req, res) => {
  const { module_id } = req.params;

  try {
    const quizzes = await QuizModel.fetchQuizzesByModule(module_id);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch quizzes', error: err.message });
  }
};