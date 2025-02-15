"use client"

import React, { useState } from 'react';
import clsx from 'clsx';
import {
  FaLightbulb,
  FaBan,
  FaInfoCircle,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import './style.css';

const TypeToIcon = {
  0: <FaLightbulb size={20} />,            // Idea
  1: <FaBan size={20} />,                  // Error
  2: <FaInfoCircle size={20} />,           // Info
  3: <FaExclamationTriangle size={20} />   // Aviso
};

export default function Box({
  type = 0,
  BoxName,
  isDropdown,
  children
}) {
  // Mapeia o "type" para uma classe CSS específica
  let typeClassName;
  switch (type) {
    case 0:
      typeClassName = 'box--idea';
      break;
    case 1:
      typeClassName = 'box--error';
      break;
    case 2:
      typeClassName = 'box--info';
      break;
    case 3:
      typeClassName = 'box--warn';
      break;
    default:
      typeClassName = 'box--idea';
  }

  // Estado local para controlar se o conteúdo está aberto (caso seja dropdown)
  // Por padrão, se isDropdown for true, inicia fechado; caso contrário, fica sempre aberto.
  const [open, setOpen] = useState(!isDropdown);

  return (
    <div className={clsx('box', typeClassName)}>
      <div className="box-header">
        {/* Ícone + BoxName */}
        <div className="box-icon">
          {TypeToIcon[type]}
          {BoxName && <span className="box-name">{BoxName}</span>}
        </div>

        {/* Botão para abrir/fechar se for dropdown */}
        {isDropdown && (
          <button
            className="box-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle dropdown"
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>

      {/* Renderiza o conteúdo somente se não for dropdown ou se estiver aberto */}
      {(!isDropdown || open) && (
        <div className="box-content">
          {children}
        </div>
      )}
    </div>
  );
}