import React, { useState, useEffect } from 'react';

const TennisForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    marca: '',
    tamanho: '',
    cor: '',
    preco: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tamanho: parseFloat(formData.tamanho),
      preco: parseFloat(formData.preco)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="tennis-form">
      <div className="form-group">
        <label>Nome do Tênis</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Marca</label>
        <input
          type="text"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Tamanho</label>
        <input
          type="number"
          step="0.5"
          min="35"
          max="47"
          name="tamanho"
          value={formData.tamanho}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Cor</label>
        <input
          type="text"
          name="cor"
          value={formData.cor}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Preço (R$)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          name="preco"
          value={formData.preco}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        {onCancel && (
          <button 
            type="button"
            onClick={onCancel}
            className="btn-delete"
          >
            Cancelar
          </button>
        )}
        <button type="submit" className="submit-btn">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default TennisForm;