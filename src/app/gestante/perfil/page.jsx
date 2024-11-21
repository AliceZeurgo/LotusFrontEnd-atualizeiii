"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/icons/utilities/lotus-icon.svg";
import conteudos from "@/public/icons/nav/conteudos.svg";
import galeria from "@/public/icons/nav/galeria.svg";
import perfil from "@/public/icons/nav/Ativo/perfil.png";
import laranja from "@/public/icons/nav/nav-laranja.png";
import config from "@/public/icons/utilities/settings-white.svg";
import edit from "@/public/icons/utilities/edit-pencil-orange.svg";
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

const SettingsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-lg font-bold mb-4">Configurações</h2>
                <button onClick={onClose} className="mt-4 bg-pink-3 text-white p-2 rounded">
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default function Home() {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState(""); // Novo estado para email
    const [password, setPassword] = useState(""); // Novo estado para senha
    const [userId, setUserId] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [yearsAsDoula, setYearsAsDoula] = useState("");
    const [description, setDescription] = useState(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    );
    const [specialization, setSpecialization] = useState([]);
    const [specializationOptions] = useState([
        "Consultoria em aleitamento materno",
        "Doula de parto",
        "Doula do luto",
        "Doula Cultural",
        "Doula de Aborto ou perda gestacional",
        "Doula de Adoção",
    ]);

    const handleIdSubmit = (e) => {
        e.preventDefault();
        fetchUserInfo(userId);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSpecializationChange = (option) => {
        if (selectedSpecializations.includes(option)) {
            setSelectedSpecializations(
                selectedSpecializations.filter((spec) => spec !== option)
            );
        } else {
            setSelectedSpecializations([...selectedSpecializations, option]);
        }
    };

    const handleSave = () => {
        setProfilePicture(selectedImage);
        setSpecialization(selectedSpecializations);
        toggleModal();
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

                <DegradeOrange className="flex justify-end items-center h-16 relative">
                    {/* Botão de configurações dentro do DegradeOrange */}
                    <div onClick={() => setIsSettingsModalOpen(true)}>
                        <Image src={config} alt="Configurações" className="w-6 h-6 cursor-pointer" />
                    </div>
                </DegradeOrange>

                <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />

                <section className="w-full h-full flex justify-center">
                    <div className="flex flex-col items-center gap-4 relative md:h-48" style={{ marginTop: '-63px' }}>
                        <div className="relative">
                            <div className="bg-white h-48 w-48 lg:h-80 lg:w-80 rounded-full flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-40 w-40 lg:h-64 lg:w-64 rounded-full flex items-center justify-center bg-gray-1">
                                        {profilePicture ? (
                                            <img
                                                src={profilePicture}
                                                alt="Perfil"
                                                className="h-full w-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <span className="text-gray-400">Foto de Perfil</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-2 max-md:h-4">
                            <h1 className="text-[30px] text-gray-4 font-ABeeZee z-40 font-thin max-md:text-[22px]">
                                {userInfo ? userInfo.name : "Nome do Usuário"}
                            </h1>
                        </div>

                        {/* DIV DE OPÇÕES PRINCIPAIS DO PERFIL */}
                        <div className="bg-gray-100 w-[600px] h-auto flex flex-col justify-around items-start mt-8 mx-auto p-4 rounded-[13px] max-md:w-[80vw]">

                            {/* Linha com Profissão e Data de Nascimento */}
                            <div className="flex gap-4 w-full mb-4 max-md:flex-col max-md:gap-2"> {/* Adicionado mb-4 para espaçamento inferior */}

                                {/* Profissão */}
                                <div className="flex items-center gap-4 bg-white p-4 rounded-[12px] border w-2/3 h-12 max-md:w-full"> {/* Aumentado para h-14 */}
                                    <Image src={editprofissão} alt="Profissão" className="w-7 h-7" />
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-ABeeZee">Profissão</span>
                                        <span className="text-gray-500">{userInfo?.profissao || ""}</span>
                                    </div>
                                </div>

                                {/* Data de Nascimento */}
                                <div className="flex items-center gap-4 bg-white p-4 rounded-[12px] border  w-1/3 h-12 max-md:w-full"> {/* Aumentado para h-14 */}
                                    <Image src={cake} alt="Data de Nascimento" className="w-6 h-7" />
                                    <div className="flex flex-col">
                                        <span className="text-gray-500">{userInfo?.dataNascimento || ""}</span>
                                    </div>
                                </div>

                            </div>

                            {/* Nome do Bebê */}
                            <div className="flex items-center gap-4 bg-white p-4 rounded-[12px] border w-full h-12 mb-4"> {/* Adicionado mb-4 */}
                                <Image src={baby} alt="Nome do Bebê" className="w-7 h-7" />
                                <div className="flex flex-col">
                                    <span className="text-gray-400 font-ABeeZee">Nome do seu Bebê</span>
                                    <span className="text-gray-500">{userInfo?.nomeBebe || ""}</span>
                                </div>
                            </div>

                            {/* Data Prevista para o Parto */}
                            <div className="flex items-center gap-4 bg-white p-4 rounded-[12px] border  w-full h-12"> {/* Aumentado para h-14 */}
                                <Image src={calendar} alt="Data Prevista para o Parto" className="w-7 h-7" />
                                <div className="flex flex-col">
                                    <span className="text-gray-400 font-ABeeZee">Data Prevista para o Parto</span>
                                    <span className="text-gray-500">{userInfo?.dataParto || ""}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                
            </main>
            
        </div>
    );
}
