import * as ModuleModel from '../models/moduleModel.js';

export const createModule = async (req, res) => {
  const { course_id, title, description, position } = req.body;
  try {
    const id = await ModuleModel.createModule(course_id, title, description, position);
    res.status(201).json({ msg: 'Module created', module_id: id });
  } catch (err) {
    res.status(500).json({ msg: 'Creation failed', error: err.message });
  }
};

export const getModulesByCourse = async (req, res) => {
  const { courseId } = req.params; // matches router param
  try {
    const modules = await ModuleModel.getModulesByCourse(courseId);
    res.json(modules);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};
