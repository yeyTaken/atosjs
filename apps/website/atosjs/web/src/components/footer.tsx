import { FaDiscord, FaGithub, FaNpm } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-transparent shadow p-5">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="flex gap-3">
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
        <p className="text-xs text-gray-500">
          AtosJS is an open-source project licensed under the MIT license.
        </p>
        <p className="text-xs text-gray-500">Copyright © 2023 AtosJS. All rights reserved.</p>
      </div>
    </footer>
  );
}
