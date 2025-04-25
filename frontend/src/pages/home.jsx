import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TennisList from '../components/tennisList';
import api from '../services/api';

const Home = () => {
  const [tenis, setTenis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Buscar tênis da API
  const fetchTenis = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllTenis();
      setTenis(data);
    } catch (err) {
      console.error('Erro ao buscar tênis:', err);
      setError('Erro ao carregar tênis. Tente recarregar a página.');
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados ao iniciar
  useEffect(() => {
    fetchTenis();
  }, []);

  // Deletar tênis
  const handleDelete = async (id) => {
    try {
      await api.deleteTenis(id);
      setTenis(tenis.filter(item => item.id !== id));
      setSuccessMessage('Tênis excluído com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Erro ao excluir:', err);
      setError('Erro ao excluir tênis');
    }
  };

  // Editar tênis
  const handleEdit = async (id, formData) => {
    try {
      const updatedTenis = await api.updateTenis(id, formData);
      setTenis(tenis.map(item => item.id === id ? updatedTenis : item));
      setSuccessMessage('Tênis atualizado com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Erro ao editar:', err);
      setError('Erro ao atualizar tênis');
    }
  };

  // Adicionar novo tênis
  const handleAdd = async (formData) => {
    try {
      const newTenis = await api.createTenis(formData);
      setTenis([...tenis, newTenis]);
      setSuccessMessage('Tênis adicionado com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Erro ao adicionar:', err);
      setError('Erro ao adicionar novo tênis');
    }
  };

  // Renderização condicional
  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Carregando lista de tênis...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>Catálogo de Tênis</h1>
      
      {/* Mensagens de status */}
      {error && (
        <div className="alert error">
          {error}
          <button onClick={fetchTenis} className="retry-btn">
            Tentar novamente
          </button>
        </div>
      )}
      
      {successMessage && (
        <div className="alert success">
          {successMessage}
        </div>
      )}

      {/* Botão de adicionar */}
      <Link to="/novo" className="add-btn">
        + Adicionar Novo Tênis
      </Link>

      {/* Lista de tênis */}
      <TennisList 
        tenis={tenis} 
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default Home;