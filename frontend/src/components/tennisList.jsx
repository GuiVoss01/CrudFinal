import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DetailModal from './detailModal'; // Criaremos este componente

const TennisList = ({ tenis = [], onDelete, onEdit }) => {
  const [selectedTenis, setSelectedTenis] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (tenis) => {
    setSelectedTenis(tenis);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'Preço indisponível';
    }
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <div className="tennis-grid">
      {tenis.map((item) => (
        <div key={item.id} className="tennis-card">
          <h3>{item.nome}</h3>
          <p><strong>Marca:</strong> {item.marca}</p>
          <p><strong>Preço:</strong> {formatPrice(item.preco)}</p>
          
          <div className="card-actions">
            <button 
              onClick={() => openModal(item)}
              className="action-btn details"
            >
              Detalhes
            </button>
            <button 
              onClick={() => onDelete(item.id)} 
              className="action-btn delete"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <DetailModal 
          tenis={selectedTenis} 
          onClose={closeModal}
          onEdit={onEdit} // Passe a função de edição
        />
      )}
    </div>
  );
};

export default TennisList;