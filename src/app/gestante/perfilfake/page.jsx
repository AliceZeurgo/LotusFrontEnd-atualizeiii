"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // Importando o axios
import Image from "next/image";
import logo from "@/public/icons/utilities/lotus-icon.svg";
import conteudos from "@/public/icons/nav/conteudos.svg";
import galeria from "@/public/icons/nav/galeria.svg";
import perfil from "@/public/icons/nav/Ativo/perfil.png";
import laranja from "@/public/icons/nav/nav-laranja.png";
import config from "@/public/icons/utilities/settings-white.svg";
import edit from "@/public/icons/utilities/edit-pencil-orange.svg"; // Ícone de editar
import logout from "@/public/icons/nav/Ativo/logout.png";
import editprofissão from "@/public/icons/utilities/editprofissão.png";
import baby from "@/public/icons/profile-information/grey/baby.svg";
import calendar from "@/public/icons/profile-information/grey/calendar.svg";
import cake from "@/public/icons/profile-information/grey/cake.png";
import chat from "@/public/icons/nav/chat.svg";
import monitoramento from "@/public/icons/nav/monitoramento.svg";
import home from "@/public/icons/nav/home.svg";

// Import dos componentes do nav
import { HomeGestante, HomeGestanteAtivo } from "@/components/nav/home";
import { GaleriaGestante, GaleriaGestanteAtivo } from "@/components/nav/galeria";
import { MonitoramentoGestante, MonitoramentoGestanteAtivo } from "@/components/nav/monitoramento";
import { PerfilGestante, PerfilGestanteAtivo } from "@/components/nav/perfil";
import { ConteudosGestante, ConteudosGestanteAtivo } from "@/components/nav/conteudos";
import { Logout } from "@/components/nav/logout";
import { NavTop } from "@/components/nav/navTop";
import { DegradeOrange } from "@/components/degrade";

// Função para buscar dados do perfil na API
const fetchUserInfo = async () => {
    try {
        const response = await axios.get("https://lotus-back-end.onrender.com/v1/Lotus/cadastro/gestante");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
        return null; // Retorna null caso ocorra erro
    }
};

const EditProfileModal = ({ isOpen, onClose, userInfo, onSave }) => {
    const [name, setName] = useState(userInfo.name || "");
    const [userPic, setUserPic] = useState(userInfo.userPic || null);
    const [profession, setProfession] = useState(userInfo.profession || "");
    const [babyName, setBabyName] = useState(userInfo.babyName || "");
    const [dueDate, setDueDate] = useState(userInfo.dueDate || "");

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ name, userPic, profession, babyName, dueDate });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-lg font-bold mb-4">Editar Perfil</h2>

                {/* Formulário de edição */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Foto de perfil</label>

                    {/* Área clicável para adicionar a imagem */}
                    <div
                        className="relative w-32 h-32 rounded-[10px] border flex items-center justify-center cursor-pointer overflow-hidden"
                        onClick={() => document.getElementById("upload-input").click()}
                    >
                        {userPic ? (
                            <img
                                src={URL.createObjectURL(userPic)}
                                alt="Pré-visualização da foto de perfil"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-400 text-sm">Clique para adicionar</span>
                        )}
                    </div>

                    {/* Input de upload de arquivo (oculto) */}
                    <input
                        type="file"
                        id="upload-input"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setUserPic(e.target.files[0])}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Profissão</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nome do Bebê</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={babyName}
                        onChange={(e) => setBabyName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Data Prevista para o Parto</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                {/* Botões */}
                <div className="flex justify-between">
                    <button onClick={onClose} className="bg-gray-300 text-black p-2 rounded">
                        Cancelar
                    </button>
                    <button onClick={handleSave} className="bg-pink-3 text-white p-2 rounded">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "Juliana",
        profession: "Professora",
        babyName: "Lotus",
        dueDate: "2025-05-12",
        userPic: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserInfo();
            if (data) {
                setUserInfo({
                    name: data.name,
                    profession: data.profession,
                    babyName: data.babyName,
                    dueDate: data.dueDate,
                    userPic: data.userPic,
                });
            }
        };
        fetchData();
    }, []);

    const handleEditProfile = (updatedUserInfo) => {
        setUserInfo((prev) => ({ ...prev, ...updatedUserInfo }));
    };

    return (
        <div className="h-screen w-screen flex p-6 gap-4 overflow-hidden max-md:flex-col">
        
        <div className="h-screen w-screen flex p-6 gap-4 overflow-hidden max-md:flex-col">
            <nav className="flex flex-col justify-between text-gray-3 max-md:flex-col">
                <div className="flex flex-col gap-4">
                    <NavTop />

                    <ul className="flex flex-col gap-2 max-md:flex-wrap mt-8">
                        <HomeGestante />
                        <MonitoramentoGestante />
                        <ConteudosGestante />
                        <GaleriaGestante />
                        <PerfilGestanteAtivo />
                    </ul>
                </div>
                <Logout />
            </nav>

            <main className="w-full h-full bg-gray-1 rounded-2xl">
                <DegradeOrange />

                <section className="w-full h-full flex justify-center">
                    <div className="flex flex-col items-center gap-4 relative md:h-48" style={{ marginTop: "-63px" }}>
                        <div className="relative">
                            <div className="bg-white h-48 w-48 lg:h-80 lg:w-80 rounded-full flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        className="rounded-full w-72 h-72"
                                        alt=""
                                        src={userInfo.userPic ? URL.createObjectURL(userInfo.userPic) : perfil.src}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-2 max-md:h-4">
                            <h1 className="text-[30px] text-gray-4 font-ABeeZee font-thin max-md:text-[22px]">
                                Perfil de {userInfo.name}
                            </h1>
                        </div>

                        <div className="absolute top-4 right-4">
                            <button onClick={() => setIsEditModalOpen(true)}>
                                <Image src={edit} alt="Editar" className="w-8 h-8" />
                            </button>
                        </div>

                        {/* DIV DE OPÇÕES PRINCIPAIS DO PERFIL */}
                        <div className="bg-gray-100 w-[600px] h-auto flex flex-col justify-around items-start mt-8 mx-auto p-4 rounded-[13px] max-md:w-[80vw]">



                            {/* Linha com Profissão e Data de Nascimento */}
                            <div className="flex gap-4 w-full mb-4 max-md:flex-col max-md:gap-2">
                                {/* Profissão */}
                                <div className="flex items-center gap-4 bg-white p-4 rounded-[12px] border w-2/3 h-12 max-md:w-full">
                                    <Image src={editprofissão} alt="Profissão" className="w-7 h-7" />
                                    <div className="flex gap-4">
                                        <span className="text-gray-400 font-ABeeZee">Profissão</span>
                                        <span className="text-gray-500">{userInfo.profession}</span>
                                    </div>
                                </div>

                                {/* Data de Nascimento */}
                                <div className="flex items-center gap-4 bg-white p-4 rounded-[12px] border  w-1/3 h-12 max-md:w-full">
                                    <Image src={cake} alt="Data de Nascimento" className="w-6 h-7" />
                                    <div className="flex flex-col">
                                        <span className="text-gray-500">15/12/1989</span>
                                    </div>
                                </div>
                            </div>

                            {/* Nome do Bebê */}
                            <div className="flex items-center gap-4 bg-white p-4 rounded-[12px] border max-md:mb-2  w-full h-12 mb-4">
                                <Image src={baby} alt="Nome do Bebê" className="w-7 h-7" />
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 font-ABeeZee">Nome do seu Bebê</span>
                                    <span className="text-gray-500">{userInfo.babyName}</span>
                                </div>
                            </div>

                            {/* Data Prevista para o Parto */}
                            <div className="flex items-center gap-4 bg-white p-4 rounded-[12px] border  w-full h-12">
                                <Image src={calendar} alt="Data Prevista para o Parto" className="w-7 h-7" />
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 font-ABeeZee">Data Prevista para o Parto</span>
                                    <span className="text-gray-500">{userInfo.dueDate}</span>
                                </div>
                            </div>


                        </div>
                    </div>
                </section>
            </main>
        </div>

            {/* Modal de Edição */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userInfo={userInfo}
                onSave={handleEditProfile}
            />
        </div>
    );
}
