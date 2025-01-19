"use client";

import { JSX, useState } from "react";
import { LuCopy, LuCheck } from "react-icons/lu";

import "../../public/home.css";

export default function Home() {
  const [activeButton, setActiveButton] = useState("npm");
  const [copyClicked, setCopyClicked] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const showCommand = (tool: string) => {
    setActiveButton(tool);
  };

  const handleCopyClick = () => {
    const commandText = getCommandText(activeButton);

    if (commandText) {
      navigator.clipboard.writeText(commandText)
        .then(() => {
          setPopupMessage(`Copied ${activeButton} command`);
          setPopupVisible(true);
          setCopyClicked(true);

          setTimeout(() => {
            setCopyClicked(false);
          }, 3000);

          setTimeout(() => {
            setPopupVisible(false);
          }, 5500);
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
        });
    }
  };

  const getCommandText = (tool: string) => {
    const commands: Record<string, string> = {
      npm: "npm install atosjs@latest",
      yarn: "yarn add atosjs@latest",
      pnpm: "pnpm add atosjs@latest",
      bun: "bun add atosjs@latest",
    };
    return commands[tool];
  };

  const getCommandJSX = (tool: string) => {
    const commands: Record<string, JSX.Element[]> = {
      npm: [
        <span key="dollarSign">$ </span>,
        <span key="command" className="command">npm </span>,
        <span key="option" className="option">install </span>,
        <span key="package" className="package">atosjs@latest</span>
      ],
      yarn: [
        <span key="dollarSign">$ </span>,
        <span key="command" className="command">yarn </span>,
        <span key="option" className="option">add </span>,
        <span key="package" className="package">atosjs@latest</span>
      ],
      pnpm: [
        <span key="dollarSign">$ </span>,
        <span key="command" className="command">pnpm </span>,
        <span key="option" className="option">add </span>,
        <span key="package" className="package">atosjs@latest</span>
      ],
      bun: [
        <span key="dollarSign">$ </span>,
        <span key="command" className="command">bun </span>,
        <span key="option" className="option">add </span>,
        <span key="package" className="package">atosjs@latest</span>
      ],
    };
    return commands[tool];
  };
  

  return (
    <div className="atosjs">
      <h1 className="heading">
        Your <span>imagination</span> is the limit.
      </h1>
      <p className="paragraph">
        AtosJS is a JavaScript library that simplifies event management. Its
        main class, GiftManager, handles the distribution of virtual rewards,
        efficiently controlling the delivery and validity of prizes.
      </p>
      <div className="button-container">
        <a
          className="button guide"
          href="https://atosjs-guide/guide/version/latest"
          rel="noopener noreferrer"
          target="_blank"
        >
          Guide
        </a>
        <a
          className="button github"
          href="https://github.com/yeyTaken/atosjs"
          rel="external noopener noreferrer"
          target="_blank"
        >
          GitHub
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-external-link"
            aria-hidden="true"
          >
            <path d="M15 3h6v6"></path>
            <path d="M10 14 21 3"></path>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          </svg>
        </a>
        <a className="button donate" href="https://github.com/sponsors/yeyTaken">
          Donate
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
          </svg>
        </a>
      </div>

      <div className="install-box">
        <div className="tab-bar">
          <div className="tabs">
            <button
              className={activeButton === "npm" ? "active" : ""}
              onClick={() => showCommand("npm")}
            >
              npm
            </button>
            <button
              className={activeButton === "yarn" ? "active" : ""}
              onClick={() => showCommand("yarn")}
            >
              yarn
            </button>
            <button
              className={activeButton === "pnpm" ? "active" : ""}
              onClick={() => showCommand("pnpm")}
            >
              pnpm
            </button>
            <button
              className={activeButton === "bun" ? "active" : ""}
              onClick={() => showCommand("bun")}
            >
              bun
            </button>
          </div>
          <button
            onClick={handleCopyClick}
            className={`copy-icon ${copyClicked ? "copied" : ""}`}
          >
            {copyClicked ? <LuCheck /> : <LuCopy />}
          </button>
        </div>
        <div className="code-box">
          <div className="language">sh</div>
          {getCommandJSX(activeButton)}
        </div>
      </div>

      {popupVisible && (
        <div className="popup">
          <span>
            <LuCheck />
            {popupMessage}
          </span>
        </div>
      )}
    </div>
  );
}
