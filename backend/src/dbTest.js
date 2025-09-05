import pool from './db.js';
import { supabase } from './supabase.js';

export const testDbConnection = async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ message: 'Conexão com o banco de dados bem-sucedida!', time: result.rows[0].now });
  } catch (error) {
    console.error('Erro ao testar conexão com o banco de dados:', error);
    res.status(500).json({ message: 'Erro ao conectar ao banco de dados', error: error.message });
  }
};

export const testSupabaseConnection = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) throw error;
    res.status(200).json({ message: 'Conexão com o Supabase bem-sucedida!', data });
  } catch (error) {
    console.error('Erro ao conectar ao Supabase:', error);
    res.status(500).json({ message: 'Erro ao conectar ao Supabase', error: error.message });
  }
};