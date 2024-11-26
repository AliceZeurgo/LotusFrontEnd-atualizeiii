// No início do arquivo
'use client'; 

import React, { useEffect, useState } from 'react';

const GestantesList = () => {
  // Usando useState para armazenar os dados da API
  const [gestantes, setGestantes] = useState(null);

  useEffect(() => {
    // Função assíncrona para buscar os dados da API
    const fetchGestantes = async () => {
      const response = await fetch('https://lotus-back-end.onrender.com/v1/Lotus/cadastro/gestante/');
      const data = await response.json();
      // Filtra o usuário com id_usuario_gestante igual a 1
      const usuario1 = data.cadastro.find(gestante => gestante.id_usuario_gestante === 1);
      setGestantes(usuario1);  // Atualiza o estado com os dados do usuário 1
    };

    fetchGestantes();  // Chamando a função para buscar os dados
  }, []);  // O array vazio significa que o efeito será executado apenas uma vez, após o componente ser montado

  // Se os dados ainda estão carregando, exibe uma mensagem de carregamento
  if (!gestantes) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Detalhes do Usuário 1</h1>
      <h2>{gestantes.nome_gestante} {gestantes.sobrenome_gestante}</h2>
      <p><strong>Idade:</strong> {gestantes.idade_gestante}</p>
      <p><strong>Profissão:</strong> {gestantes.profissao_gestante}</p>
      <p><strong>Nome do Bebê:</strong> {gestantes.nome_bebe}</p>
      <p><strong>Semanas de Gravidez:</strong> {gestantes.semanas_de_gravidez}</p>
      {gestantes.foto_gestante && (
        <img src={gestantes.foto_gestante} alt={`${gestantes.nome_gestante} foto`} width={150} />
      )}
    </div>
  );
};

export default GestantesList;
