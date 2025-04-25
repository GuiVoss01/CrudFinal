import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TennisForm from '../components/tennisForm';
import api from '../services/api';
import '../edit.css';

const FormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Busca os dados se for edição
  useEffect(() => {
    if (id) {
      setLoading(true);
      api.getTenisById(id)
        .then(data => {
          setInitialData(data);
          setError(null);
        })
        .catch(err => {
          console.error('Erro ao buscar tênis:', err);
          setError('Erro ao carregar tênis para edição');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (id) {
        await api.updateTenis(id, formData);
      } else {
        await api.createTenis(formData);
      }
      navigate('/'); // Redireciona para home após sucesso
    } catch (err) {
      console.error('Erro ao salvar tênis:', err);
      setError('Erro ao salvar. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => navigate('/')}>Voltar para lista</button>
      </div>
    );
  }

  return (
    <div className="form-page-container">
      <h2>{id ? 'Editar Tênis' : 'Cadastrar Novo Tênis'}</h2>
      {loading && <p>Salvando...</p>}
      <TennisForm 
        onSubmit={handleSubmit} 
        initialData={initialData || {
          nome: '',
          marca: '',
          tamanho: '',
          cor: '',
          preco: ''
        }}
      />
      <button 
        onClick={() => navigate('/')}
        style={{ marginTop: '20px' }}
        className='btn-delete'
      >
        Cancelar
      </button>
    </div>
  );
};

export default FormPage;