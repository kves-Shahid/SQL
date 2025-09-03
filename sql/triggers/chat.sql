-- File: sql/triggers/chat.sql
-- Before inserting a chat message, clean banned words

DROP TRIGGER IF EXISTS trg_sanitize_chat_message;
DELIMITER //
CREATE TRIGGER trg_sanitize_chat_message
BEFORE INSERT ON chat_message
FOR EACH ROW
BEGIN
  -- Example: replace 'badword' with '[censored]'
  SET NEW.message = REPLACE(NEW.message, 'badword', '[censored]');
  SET NEW.message = REPLACE(NEW.message, 'uglyword', '[censored]');
  -- Add more replacements as needed
END;
//
DELIMITER ;
