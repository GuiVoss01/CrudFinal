import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenis, setTenis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenis = async () => {
      try {
        const data = await api.getTenisById(id);
        setTenis(data);
      } catch (err) {
        setError('Erro ao carregar detalhes do tênis');
      } finally {
        setLoading(false);
      }
    };

    fetchTenis();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!tenis) return <div>Tênis não encontrado</div>;

  return (
    <div className="detail-container">
      <h1>{tenis.nome}</h1>
      
      <div className="detail-card">
        <div className="detail-row">
          <span>Marca:</span>
          <strong>{tenis.marca}</strong>
        </div>
        
        <div className="detail-row">
          <span>Tamanho:</span>
          <strong>{tenis.tamanho}</strong>
        </div>
        
        <div className="detail-row">
          <span>Cor:</span>
          <strong>{tenis.cor}</strong>
        </div>
        
        <div className="detail-row">
          <span>Preço:</span>
          <strong>R$ {tenis.preco?.toFixed(2)}</strong>
        </div>
        
        <div className="detail-row">
          <span>Criado em:</span>
          <strong>{tenis.data_criacao}</strong>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate(-1)} className="action-btn">
          Voltar
        </button>
        <Link to={`/editar/${id}`} className="action-btn edit">
          Editar
        </Link>
      </div>
    </div>
  );
};

export default DetailPage;