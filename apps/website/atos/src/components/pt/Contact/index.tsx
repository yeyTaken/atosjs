"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { FiUser, FiMail } from 'react-icons/fi';
import { LuContact } from 'react-icons/lu';
import { IoCloudUploadOutline } from 'react-icons/io5';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Reportar bugs');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    if (file) formData.append('attachment', file);

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: formData });
      const json = await res.json();
      setStatus(res.ok ? 'Email enviado com sucesso!' : `Erro: ${json.error}`);
    } catch {
      setStatus('Erro ao enviar.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-background rounded-lg shadow">

      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
        <LuContact /> Contato
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna esquerda: formulário */}
        <div className="space-y-4">
          <label className="block">
            <span className="flex items-center gap-1"><FiUser /> Nome</span>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-black border rounded" />
          </label>

          <label className="block">
            <span className="flex items-center gap-1"><FiMail /> Email</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-black border rounded" />
          </label>

          <label className="block">
            <span className="flex items-center gap-1"><FiMail /> Assunto</span>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-black border rounded">
              <option value="Reportar bugs">Reportar bugs</option>
              <option value="Contato">Contato</option>
              <option value="Recrutamento">Recrutamento</option>
            </select>
          </label>

          <label className="block">
            <span className="flex items-center gap-1"><FiMail /> Mensagem</span>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-black border rounded h-40" />
          </label>

          {/* Dropzone mobile */}
          <div
            className="md:hidden border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}>
            <IoCloudUploadOutline className="text-4xl mb-2 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400 text-center">
              {file ? (
                <>{file.name}</>
              ) : (
                'Clique ou arraste o arquivo aqui'
              )}
            </span>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange} />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded">
            Enviar
          </button>

          {status && <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">{status}</p>}
        </div>

        {/* Coluna direita: Dropzone Desktop */}
        <div className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 h-full cursor-pointer"
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}>
          <IoCloudUploadOutline className="text-6xl text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {file ? (
              <>{file.name}</>
            ) : (
              'Clique ou arraste um arquivo aqui para anexar'
            )}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange} />
        </div>

      </div>
    </form>
  );
}