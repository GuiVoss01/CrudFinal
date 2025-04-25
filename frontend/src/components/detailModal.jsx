import React, { useEffect, useState } from 'react';
import TennisForm from './tennisForm'; // Importe o componente de formulário

const DetailModal = ({ tenis, onClose, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tenis) return null;

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) return 'Preço indisponível';
    return price.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Data indisponível';
    const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleString('pt-BR', options);
  };

  const handleSubmit = (formData) => {
    onEdit(tenis.id, formData);
    setIsEditing(false);
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-container">
        <button 
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          &times;
        </button>
        
        {isEditing ? (
          <>
            <div className="modal-header">
              <h2>Editar Tênis</h2>
            </div>
            
            <div className="modal-content">
              <TennisForm 
                initialData={tenis}
                onSubmit={handleSubmit}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h2>{tenis.nome}</h2>
              <span className="brand-badge">{tenis.marca}</span>
            </div>
            
            <div className="modal-content">
              <div className="detail-row">
                <span>Tamanho:</span>
                <strong>{tenis.tamanho || 'N/A'}</strong>
              </div>
              
              <div className="detail-row">
                <span>Cor:</span>
                <strong>{tenis.cor || 'N/A'}</strong>
              </div>
              
              <div className="detail-row">
                <span>Preço:</span>
                <strong>{formatPrice(tenis.preco)}</strong>
              </div>
              
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={onClose}
                className="btn-delete"
              >
                Fechar
              </button>
              <button 
                className="edit"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailModal;