"use client";

import { useEffect } from "react";
import "../../public/home.css";

export default function Home() {
  useEffect(() => {
    let currentCommand = "npm install atosjs@latest";
    const copyIcon = document.getElementById("copy-icon");

    function showCommand(tool: string) {
      const buttons = document.querySelectorAll(".tab-bar button");
      buttons.forEach((button) => button.classList.remove("active"));

      const commands: Record<string, string> = {
        npm: '<span class="command">npm</span> <span class="option">install</span> <span class="package">atosjs@latest</span>',
        yarn: '<span class="command">yarn</span> <span class="option">add</span> <span class="package">atosjs@latest</span>',
        pnpm: '<span class="command">pnpm</span> <span class="option">add</span> <span class="package">atosjs@latest</span>',
        bun: '<span class="command">bun</span> <span class="option">add</span> <span class="package">atosjs@latest</span>',
      };

      const codeBox = document.querySelector(".code-box");
      if (codeBox) {
        codeBox.innerHTML = `
          <div class="language">sh</div>
          ${commands[tool]}
        `;
      }

      currentCommand = `${tool} ${tool === "npm" ? "install" : "add"} atosjs@latest`;

      const activeButton = document.querySelector(
        `button[onclick="showCommand('${tool}')"]`
      );
      if (activeButton) activeButton.classList.add("active");
    }

    function copyCommand() {
      navigator.clipboard.writeText(currentCommand).then(() => {
        if (copyIcon) {
          copyIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="#28a745" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          `;
          setTimeout(() => {
            copyIcon.innerHTML = `
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            `;
          }, 2000);
        }
      });
    }

    // Attach functions to the window object so they can be used in the DOM
    (window as Window & typeof globalThis).showCommand = showCommand;
    (window as Window & typeof globalThis).copyCommand = copyCommand;
  }, []);

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
          href="/guide/version/latest"
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
        <a className="button donate" href="/donate">
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
              className="active"
              onClick={() => (window as Window & typeof globalThis).showCommand("npm")}
            >
              npm
            </button>
            <button onClick={() => (window as Window & typeof globalThis).showCommand("yarn")}>
              yarn
            </button>
            <button onClick={() => (window as Window & typeof globalThis).showCommand("pnpm")}>
              pnpm
            </button>
            <button onClick={() => (window as Window & typeof globalThis).showCommand("bun")}>
              bun
            </button>
          </div>
          <button
            className="copy-btn"
            onClick={() => (window as Window & typeof globalThis).copyCommand()}
          >
            <svg id="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
          </button>
        </div>
        <div className="code-box">
          <div className="language">sh</div>
          <span className="command">npm</span> <span className="option">install</span> <span className="package">atosjs@latest</span>
        </div>
      </div>
    </div>
  );
}
