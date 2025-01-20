import { FaDiscord, FaNpm, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="text-white py-4 text-center">
      <p className='text-text-paragraph'>&copy; 2025 Rabi & TakenStudios. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="/discord">
            <FaDiscord className="text-2xl cursor-pointer hover:text-blue-500" />
        </a>
        <a href="https://www.npmjs.com/package/atosjs">
            <FaNpm className="text-2xl cursor-pointer hover:text-red-500" />
        </a>
        <a href="https://github.com/yeyTaken/atosjs">
            <FaGithub className="text-2xl cursor-pointer hover:text-gray-500" />
        </a>
      </div>
    </footer>
  );
}
