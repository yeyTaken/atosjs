import '../../public/home.css'

export default function Home() {
  return (
    <div className='atosjs'>
      <h1 className='heading'>Sua <span>imaninação</span> é o limite.</h1>
      <p className='paragraph'>A AtosJS é uma biblioteca JavaScript para facilitar a gestão de eventos digitais. Sua classe principal, **GiftManager**, gerencia a distribuição de recompensas virtuais, controlando entregas e validade dos prêmios de forma eficiente.</p>
      <div className="button-container">
  <a className="button docs" href="/docs">Docs</a>
  <a className="button guide" href="https://discordjs.guide" rel="noopener noreferrer" target="_blank">Guide 
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-external-link" aria-hidden="true">
      <path d="M15 3h6v6"></path>
      <path d="M10 14 21 3"></path>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    </svg>
  </a>
  <a className="button github" href="https://github.com/discordjs/discord.js" rel="external noopener noreferrer" target="_blank">GitHub 
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-external-link" aria-hidden="true">
      <path d="M15 3h6v6"></path>
      <path d="M10 14 21 3"></path>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    </svg>
  </a>
</div>

    </div>
  );
}

