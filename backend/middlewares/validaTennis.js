export const validateTennis = (req, res, next) => {
  const { nome, marca, tamanho, cor, preco } = req.body;
  
  if (!nome || nome.trim() === '') {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }
  
  if (!marca || marca.trim() === '') {
    return res.status(400).json({ error: 'Marca é obrigatória' });
  }
  
  if (!tamanho || isNaN(tamanho)) {
    return res.status(400).json({ error: 'Tamanho inválido' });
  }
  
  if (!cor || cor.trim() === '') {
    return res.status(400).json({ error: 'Cor é obrigatória' });
  }
  
  if (!preco || isNaN(preco)) {
    return res.status(400).json({ error: 'Preço inválido' });
  }
  
  next();
};