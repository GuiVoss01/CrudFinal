import mysql from 'mysql2/promise'; 

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: 'Gui0106', 
  database: 'crud_tenis',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste de conexão
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado ao MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    process.exit(1); // Encerra o aplicativo se não conectar
  });

export const db = pool;
