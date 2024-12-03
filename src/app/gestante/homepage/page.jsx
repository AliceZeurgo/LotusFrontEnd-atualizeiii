'use client';

import Image from "next/image";
import axios from "axios";

// Ícones
import Logo from "@/public/icons/utilities/lotus-icon.svg";
import LogoLogout from "@/public/icons/nav/logout.svg";
import LogoHome from "@/public/icons/nav/home.svg";
import LogoMonitoramento from "@/public/icons/nav/monitoramento.svg";
import LogoConteudo from "@/public/icons/nav/conteudos.svg";
import LogoChat from "@/public/icons/nav/chat.svg";
import LogoGaleria from "@/public/icons/nav/galeria.svg";
import LogoPerfil from "@/public/icons/nav/profile.svg";
import LogoBaby from "@/public/icons/profile-information/pink/baby.svg";

// React Icons
import { IoAdd } from "react-icons/io5";

// Componentes
import Calendario from "@/components/Calendario";

// Hooks do React
import { useState, useEffect } from "react";

// Estilo do calendário
import "@/../src/styles/Calendar.css";

export default function Home() {
  const [date, setDate] = useState(null); // Inicializa com null para evitar erro de hidratação
  const [events, setEvents] = useState([]); // Eventos do servidor e locais
  const [eventTitle, setEventTitle] = useState(''); // Título do evento
  const [eventDate, setEventDate] = useState(''); // Data do evento
  const [eventTime, setEventTime] = useState(''); // Horário do evento
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [success, setSuccess] = useState(null); // Estado para armazenar mensagens de sucesso

  const apiUrl = "https://lotus-back-end.onrender.com/v1/Lotus/agenda";

  // Função para buscar eventos
  const fetchEvents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setEvents(response.data.agendaDados || []); // Atualiza com eventos da API
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setError("Falha ao carregar eventos.");
    }
  };

  // Função para criar um evento
  const createEvent = async () => {
    if (eventTitle && eventDate && eventTime) {
      try {
        console.log("Enviando dados:", {
          descricao_calendario: eventTitle,
          data_calendario: eventDate,
          horario_calendario: eventTime,
          usuario_calendario_id: 1, // ID fixo do usuário
        });

        // Criação do evento na API
        const response = await axios.post(apiUrl, {
          descricao_calendario: eventTitle,
          data_calendario: eventDate,
          horario_calendario: eventTime,
          usuario_calendario_id: 1, // ID fixo do usuário
        });

        // Verifica se a resposta é bem-sucedida
        if (response.status === 200) {
          console.log("Evento criado com sucesso:", response.data);

          // Adiciona o evento à lista local
          const newEvent = {
            descricao_calendario: eventTitle,
            data_calendario: eventDate,
            horario_calendario: eventTime,
          };
          setEvents(prevEvents => [...prevEvents, newEvent]);

          // Limpa os campos do formulário
          setEventTitle('');
          setEventDate('');
          setEventTime('');

          // Exibe mensagem de sucesso
          setSuccess("Evento criado com sucesso!");

          // Fecha o modal
          setIsModalOpen(false);
        } else {
          console.error("Erro ao criar evento:", response);
          setError("Falha ao criar evento.");
        }
      } catch (error) {
        console.error("Erro ao criar evento:", error);
        if (error.response) {
          // Se a resposta foi recebida mas com erro
          setError("Erro ao criar evento: " + error.response.data.message);
        } else {
          // Se o erro foi de rede ou algo não relacionado à resposta da API
          setError("Erro desconhecido ao criar evento.");
        }
      }
    } else {
      setError("Por favor, preencha todos os campos.");
    }
  };

  // Função para abrir o modal
  const openModal = () => setIsModalOpen(true);

  // Função para fechar o modal
  const closeModal = () => setIsModalOpen(false);

  // Busca inicial dos eventos (apenas no lado do cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDate(new Date()); // Define a data inicial no cliente
      fetchEvents();
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <header className="flex flex-col md:w-[20%] py-10 px-10">
        <div className="flex flex-row items-center gap-2 pb-16">
          <Image src={Logo} alt="logo" className="size-16" />
          <h1 className="font-ABeeZee text-pink-3 font-light text-3xl">Lótus</h1>
        </div>
        <nav className="flex flex-col gap-10 h-[80%]">
          {[{ icon: LogoHome, label: "Home" }, { icon: LogoMonitoramento, label: "Monitoramento" }, { icon: LogoConteudo, label: "Conteúdo" }, { icon: LogoChat, label: "Chat" }, { icon: LogoGaleria, label: "Galeria" }, { icon: LogoPerfil, label: "Perfil" }].map((item, idx) => (
            <a key={idx} href="#" className="flex flex-row items-center p-2 gap-2 hover:bg-orange-degrade-3 transition duration-200 rounded-xl group">
              <Image src={item.icon} alt={item.label.toLowerCase()} className="size-8" />
              <h1 className="font-Inter font-normal text-gray-3 text-lg group-hover:text-white">{item.label}</h1>
            </a>
          ))}
        </nav>
        <button className="flex flex-row gap-2 items-center">
          <Image src={LogoLogout} alt="logout" className="size-8" />
          <p className="font-Inter font-normal text-gray-3 text-lg hover:text-orange-3">Log out</p>
        </button>
      </header>

      {/* Conteúdo principal */}
      <main className="w-[80%] bg-white p-10 grid grid-cols-2 gap-2">
        <div className="h-full bg-gray-2 p-6 rounded-[40px] flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-ABeeZee text-black font-medium">Olá,</h2>
            <p className="font-Inter font-light text-gray-4 text-xs">
              Estamos aqui para acompanhar cada passo dessa jornada incrível, oferecendo suporte, dicas e informações personalizadas para você e seu bebê.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-[440px] w-[440px] bg-white rounded-xl border-4 border-pink-3 flex items-center justify-center">
              <Image src={LogoBaby} alt="bebê" className="size-1/2" />
            </div>
          </div>
        </div>

        {/* Coluna do calendário e eventos */}
        <div className="h-full p-6 rounded-[40px]">
          <Calendario events={events} />
          {/* Lista de eventos abaixo do calendário */}
          <div className="mt-6">
            <h3 className="font-ABeeZee text-black font-medium mb-4">Eventos:</h3>
            <ul className="flex flex-col gap-4">
              {events.map((event, idx) => (
                <li key={idx} className="bg-gray-200 p-4 rounded-md">
                  <p className="font-ABeeZee text-black">📅 {event.data_calendario}</p>
                  <p className="font-Inter text-gray-600">⏰ {event.horario_calendario}</p>
                  <p className="font-Inter text-gray-900">🔖 {event.descricao_calendario}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal de Adicionar Evento */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold">Adicionar Evento</h3>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <div className="flex flex-col gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Título do evento"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="border p-2 rounded"
                />
                <button
                  onClick={createEvent}
                  className="bg-pink-3 text-white p-2 rounded mt-4"
                >
                  Criar Evento
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-black p-2 rounded mt-4"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botão para abrir modal */}
        <button
          onClick={openModal}
          className="fixed bottom-6 right-6 bg-pink-3 p-4 rounded-full text-white"
        >
          <IoAdd size={24} />
        </button>
      </main>
    </div>
  );
}
