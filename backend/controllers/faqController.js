const db = require('../config/database');

exports.getAllFaqs = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT f.*, c.name as category_name 
      FROM faqs f 
      LEFT JOIN categories c ON f.category_id = c.id 
      WHERE f.is_active = 1
      ORDER BY f.sort_order, f.created_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFaqById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM faqs WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createFaq = async (req, res) => {
  try {
    const { category_id, question, answer, keywords, sort_order } = req.body;
    const [result] = await db.query(
      'INSERT INTO faqs (category_id, question, answer, keywords, sort_order) VALUES (?, ?, ?, ?, ?)',
      [category_id || null, question, answer, keywords || null, sort_order || 0]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const { category_id, question, answer, keywords, is_active, sort_order } = req.body;
    const [result] = await db.query(
      'UPDATE faqs SET category_id = ?, question = ?, answer = ?, keywords = ?, is_active = ?, sort_order = ? WHERE id = ?',
      [category_id || null, question, answer, keywords || null, is_active !== undefined ? is_active : 1, sort_order || 0, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, message: 'FAQ updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM faqs WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
