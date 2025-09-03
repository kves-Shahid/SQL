
import * as ChatModel from '../models/chatModel.js';


export const postMessage = async (req, res) => {
  const { module_id, student_id, message } = req.body;

  if (!module_id || !message) {
    return res.status(400).json({ msg: 'module_id and message are required' });
  }

  try {
    await ChatModel.insertMessage(module_id, student_id || null, message);
    res.status(201).json({ msg: 'Message sent' });
  } catch (err) {
    res.status(500).json({ msg: 'Sending failed', error: err.message });
  }
};

/*
 GET /chat/:module_id
 */
export const getMessagesByModule = async (req, res) => {
  const { module_id } = req.params;

  try {
    const messages = await ChatModel.getMessagesByModule(module_id);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};
