'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '@/../src/styles/Calendar.css';
import axios from 'axios';
import { IoAdd } from 'react-icons/io5';

export default function Calendario() {
  const [date, setDate] = useState(null);  // Inicializa com null para evitar erro de hidratação
  const [events, setEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiUrl = "https://lotus-back-end.onrender.com/v1/Lotus/agenda";

  // Buscar eventos na API
  const fetchEvents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setEvents(response.data.agendaDados);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  // Criar novo evento
  const createEvent = async () => {
    if (eventTitle && eventDate && eventTime) {
      try {
        const response = await axios.post(apiUrl, {
          descricao_calendario: eventTitle,
          data_calendario: eventDate,
          horario_calendario: eventTime,
          usuario_calendario_id: 1, // ID do usuário
        });

        const newEvent = {
          descricao_calendario: eventTitle,
          data_calendario: eventDate,
          horario_calendario: eventTime,
        };

        setNewEvents([...newEvents, newEvent]);
        setEventTitle('');
        setEventDate(null);
        setEventTime('');
        fetchEvents();
        setIsModalOpen(false);
      } catch (error) {
        console.error("Erro ao criar evento:", error);
      }
    }
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  // Garantir que a data seja tratada no lado do cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDate(new Date());  // Define a data inicial no cliente
      fetchEvents();
    }
  }, []);

  return (
    <div>
      {/* Calendário */}
      {date && (
        <Calendar 
          onChange={setDate} 
          value={date} 
          minDate={new Date()} 
          formatMonthYear={(locale, date) => date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}  // Formata mês/ano
        />
      )}

      {/* Lista de eventos */}
      <div className="flex flex-col gap-4 mt-6 overflow-auto max-h-[200px]">
        {events.map((event, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{event.descricao_calendario}</h3>
              <p className="text-sm text-gray-600">
                {event.data_calendario} - {event.horario_calendario}
              </p>
            </div>
            <button className="text-red-500 font-semibold hover:underline">Remover</button>
          </div>
        ))}
        {newEvents.map((event, index) => (
          <div key={`new-${index}`} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{event.descricao_calendario}</h3>
              <p className="text-sm text-gray-600">
                {event.data_calendario} - {event.horario_calendario}
              </p>
            </div>
            <button className="text-red-500 font-semibold hover:underline">Remover</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold">Adicionar Evento</h3>
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="Título do evento"
                className="border p-2 rounded-md"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <input
                type="date"
                className="border p-2 rounded-md"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <input
                type="time"
                className="border p-2 rounded-md"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <button onClick={closeModal} className="bg-gray-400 text-white p-2 rounded-md">
                Cancelar
              </button>
              <button onClick={createEvent} className="bg-pink-3 text-white p-2 rounded-md">
                Adicionar Evento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão para abrir o modal */}
      <button
        onClick={openModal}
        className="bg-pink-3 text-white p-4 rounded-full flex justify-center items-center w-16 h-16 fixed bottom-4 right-4"
      >
        <IoAdd size={30} />
      </button>
    </div>
  );
}
