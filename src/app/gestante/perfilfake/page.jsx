"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/icons/utilities/lotus-icon.svg";
import conteudos from "@/public/icons/nav/conteudos.svg";
import galeria from "@/public/icons/nav/galeria.svg";
import perfil from "@/public/icons/nav/Ativo/perfil.png";
import laranja from "@/public/icons/nav/nav-laranja.png";
import config from "@/public/icons/utilities/settings-white.svg";
import edit from "@/public/icons/utilities/edit-pencil-orange.svg";  {/* Ícone de editar */}
import logout from "@/public/icons/nav/Ativo/logout.png";
import editprofissão from "@/public/icons/utilities/editprofissão.png";
import baby from "@/public/icons/profile-information/grey/baby.svg";
import calendar from "@/public/icons/profile-information/grey/calendar.svg";
import cake from "@/public/icons/profile-information/grey/cake.png";
import chat from "@/public/icons/nav/chat.svg";
import monitoramento from "@/public/icons/nav/monitoramento.svg";
import home from "@/public/icons/nav/home.svg"

//Import dos componentes do nav
import { HomeGestante, HomeGestanteAtivo } from '@/components/nav/home';
import { GaleriaGestante, GaleriaGestanteAtivo } from '@/components/nav/galeria';
import { MonitoramentoGestante, MonitoramentoGestanteAtivo } from '@/components/nav/monitoramento';
import { PerfilGestante, PerfilGestanteAtivo } from '@/components/nav/perfil';
import { ConteudosGestante, ConteudosGestanteAtivo } from '@/components/nav/conteudos';
import { Logout } from '@/components/nav/logout';
import { NavTop } from '@/components/nav/navTop';
import { DegradeOrange } from '@/components/degrade';
import doula1 from "@/public/img/Doula-1.jpg"

// Modal de Edição de Perfil
const EditProfileModal = ({ isOpen, onClose, userInfo, onSave }) => {
    const [name, setName] = useState(userInfo.name || "");
    const [profession, setProfession] = useState(userInfo.profession || "");
    const [babyName, setBabyName] = useState(userInfo.babyName || "");
    const [dueDate, setDueDate] = useState(userInfo.dueDate || "");
    const [selectedImage, setSelectedImage] = useState(null); 

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ name, profession, babyName, dueDate });
        onClose();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Converte a imagem para Base64 para exibição
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Editar Perfil</h2>

            {/* Input para imagem */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto do Perfil
                </label>
                <div className="flex items-center gap-4">
                    {/* Pré-visualização da imagem */}
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <Image
                                src={doula1}
                                alt="Imagem atual"
                                className="object-cover w-full h-full"
                            />
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
                    />
                </div>
            </div>

            {/* Outros campos */}
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
        dueDate: "2025-05-12"
    });

    const handleEditProfile = (updatedUserInfo) => {
        setUserInfo(updatedUserInfo); 
    };

    return (
        <div className="h-screen w-screen flex p-6 gap-4 overflow-hidden max-md:flex-col">
            <nav className="flex flex-col justify-between text-gray-3 max-md:flex-col">
                <div className="flex flex-col gap-4">
                    <NavTop></NavTop>

                    <ul className="flex flex-col gap-2 max-md:flex-wrap mt-8 max-md:flex-row max-md:">
                        <HomeGestante></HomeGestante>
                        <MonitoramentoGestante></MonitoramentoGestante>
                        <ConteudosGestante></ConteudosGestante>
                        <GaleriaGestante></GaleriaGestante>
                        <PerfilGestanteAtivo></PerfilGestanteAtivo>
                    </ul>
                </div>

                <Logout></Logout>
            </nav>

            <main className="w-full h-full bg-gray-1 rounded-2xl">
                <DegradeOrange></DegradeOrange>

                <section className="w-full h-full flex justify-center">
                    {/* Conteúdo do Perfil */}


        
                    <div className="flex flex-col items-center gap-4 relative md:h-48" style={{ marginTop: '-63px' }}>
                        <div className="relative">
                            <div className="bg-white h-48 w-48 lg:h-80 lg:w-80 rounded-full flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image className="rounded-full w-72 h-72" alt="" src={doula1}></Image>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-2 max-md:h-4">
                            <h1 className="text-[30px] text-gray-4 font-ABeeZee z-40  font-thin max-md:text-[22px]">
                                Perfil de {userInfo.name}
                            </h1>
                        </div>

                        {/* Botão de Edição (Abrir Modal) */}
                        <div className="absolute top-4 right-[30px]">
                            <button onClick={() => setIsEditModalOpen(true)}>
                                <Image src={edit} alt="Editar" className="w-10 h-10 bg-white rounded-full" />
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
