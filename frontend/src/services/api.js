const API_BASE_URL = 'http://localhost:3001/api/tenis';

// Função para tratar erros de resposta HTTP
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Erro na resposta da API:', errorData);
    throw new Error(errorData.message || 'Erro na requisição');
  }
  return response.json();
};

const api = {
  getAllTenis: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro no servidor');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro detalhado na API:', error);
      throw error;
    }
  },
  async getTenisById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Erro ao buscar tênis com ID ${id}:`, error);
      throw new Error('Não foi possível carregar o tênis');
    }
  },

  async createTenis(tenisData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tenisData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Erro ao criar tênis:', error);
      throw new Error('Não foi possível criar o tênis');
    }
  },

  async updateTenis(id, tenisData) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tenisData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Erro ao atualizar tênis com ID ${id}:`, error);
      throw new Error('Não foi possível atualizar o tênis');
    }
  },

  async deleteTenis(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao deletar tênis');
      }
      
      return true;
    } catch (error) {
      console.error(`Erro ao deletar tênis com ID ${id}:`, error);
      throw new Error('Não foi possível deletar o tênis');
    }
  },
};

export default api;      