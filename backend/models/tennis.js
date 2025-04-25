import { db } from '../db.js';

export const Tennis = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM tenis');
    return rows.map(item => ({
      ...item,
      preco: Number(item.preco) || 0 // Converte para número
    }));
  },

  getById: async (id) => {
    const [rows] = await db.query(`
      SELECT 
        id,
        nome,
        marca,
        tamanho,
        cor,
        preco,
        DATE_FORMAT(created_at, '%d/%m/%Y %H:%i') as data_criacao
      FROM tenis 
      WHERE id = ?
    `, [id]);
    return rows[0] || null;
  },

  create: async (tennisData) => {
    const [result] = await db.query('INSERT INTO tenis SET ?', tennisData);
    return { id: result.insertId, ...tennisData };
  },

  update: async (id, tennisData) => {
    await db.query('UPDATE tenis SET ? WHERE id = ?', [tennisData, id]);
    return await Tennis.getById(id);
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM tenis WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};