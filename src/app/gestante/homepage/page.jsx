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

// Componente do Modal
const Modal = ({ isOpen, onClose, onSubmit, error, success, setTitle, setDate, setTime }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold">Adicionar Evento</h3>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Título do evento"
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="time"
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={onSubmit} className="bg-pink-3 text-white px-4 py-2 rounded">
            Criar Evento
          </button>
          <button onClick={onClose} className="bg-gray-200 text-black px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [date, setDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const apiUrl = "https://lotus-back-end.onrender.com/v1/Lotus/agenda";

  // Função para buscar eventos
  const fetchEvents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setEvents(response.data.agendaDados || []);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setError("Falha ao carregar eventos.");
    }
  };

  // Validação dos campos do evento
  const validateEvent = () => {
    if (!eventTitle.trim()) {
      setError("O título do evento é obrigatório.");
      return false;
    }
    if (!eventDate) {
      setError("A data do evento é obrigatória.");
      return false;
    }
    if (!eventTime) {
      setError("O horário do evento é obrigatório.");
      return false;
    }
    return true;
  };

  // Função para criar um evento
  const createEvent = async () => {
    if (!validateEvent()) return;

    try {
      const response = await axios.post(apiUrl, {
        descricao_calendario: eventTitle,
        data_calendario: eventDate,
        horario_calendario: eventTime,
        usuario_calendario_id: 1, // ID fixo do usuário
      });

      if (response.status === 200) {
        setEventTitle('');
        setEventDate('');
        setEventTime('');
        setSuccess("Evento criado com sucesso!");
        setTimeout(() => setSuccess(null), 5000);

        fetchEvents();
        setIsModalOpen(false);
      }
    } catch (error) {
      setError("Erro ao criar evento.");
      setTimeout(() => setError(null), 5000);
    }
  };

  // Função para abrir/fechar modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Busca inicial dos eventos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDate(new Date());
      fetchEvents();
    }
  }, []);

  const menuItems = [
    { icon: LogoHome, label: "Home" },
    { icon: LogoMonitoramento, label: "Monitoramento" },
    { icon: LogoConteudo, label: "Conteúdo" },
    { icon: LogoChat, label: "Chat" },
    { icon: LogoGaleria, label: "Galeria" },
    { icon: LogoPerfil, label: "Perfil" },
  ];

  // Ordena eventos por data
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.data_calendario);
    const dateB = new Date(b.data_calendario);
    return dateA - dateB;
  });

  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <header className="flex flex-col md:w-[20%] py-10 px-10">
        <div className="flex flex-row items-center gap-2 pb-16">
          <Image src={Logo} alt="logo" className="size-16" />
          <h1 className="font-ABeeZee text-pink-3 font-light text-3xl">Lótus</h1>
        </div>
        <nav className="flex flex-col gap-10 h-[80%]">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="flex flex-row items-center p-2 gap-2 hover:bg-orange-degrade-3 transition duration-200 rounded-xl group"
            >
              <Image src={item.icon} alt={item.label.toLowerCase()} className="size-8" />
              <h1 className="font-Inter font-normal text-gray-3 text-lg group-hover:text-white">
                {item.label}
              </h1>
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
          <div className="mt-6">
            <h3 className="font-ABeeZee text-black font-medium mb-4">Eventos:</h3>
            <ul className="flex flex-col gap-4">
              {sortedEvents.map((event, idx) => (
                <li key={idx} className="bg-gray-200 p-4 rounded-md">
                  <p className="font-ABeeZee text-black">📅 {event.data_calendario_formatada}</p>
                  <p className="font-Inter text-gray-600">⏰ {event.horario_formatado}</p>
                  <p className="font-Inter text-gray-900">🔖 {event.descricao_calendario}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Botão de adicionar evento */}
      <div
        className="fixed bottom-10 right-10 bg-pink-3 text-white p-4 rounded-full shadow-lg cursor-pointer"
        onClick={openModal}
      >
        <IoAdd size={30} />
      </div>

      {/* Modal para adicionar evento */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={createEvent}
        error={error}
        success={success}
        setTitle={setEventTitle}
        setDate={setEventDate}
        setTime={setEventTime}
      />
    </div>
  );
}
