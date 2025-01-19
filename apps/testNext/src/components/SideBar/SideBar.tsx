'use client';

import { useState, useEffect, useRef } from 'react';
import {
  FaGift,
  FaBook,
  FaRocket,
  FaPlusCircle,
  FaSearch,
  FaCheckCircle,
  FaCheckSquare,
  FaHistory,
  FaStar,
  FaTags,
  FaClock
} from 'react-icons/fa';
import Link from 'next/link';

import versions from '@/settings/versions.json';
import './style.css';

export const SideBar = () => {
  const [versionsDropdownVisible, setVersionsDropdownVisible] = useState(false);
  const [TimeFormatDropdownVisible, setTimeFormatDropdownVisible] = useState(false);
  const [optionsDropdownVisible, setOptionsDropdownVisible] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('latest');
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [currentVersionClasses, setCurrentVersionClasses] = useState<string[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const sidebarRef = useRef(null);
  const headerRef = useRef(null);

  const toggleVersionsDropdown = () => setVersionsDropdownVisible(!versionsDropdownVisible);
  const toggleTimeFormatDropdown = () => setTimeFormatDropdownVisible(!TimeFormatDropdownVisible);
  const toggleOptionsDropdown = () => setOptionsDropdownVisible(!optionsDropdownVisible);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    setPopupMessage(`Changed to version ${version}`);
    setPopupVisible(true);
    setVersionsDropdownVisible(false);

    setTimeout(() => {
      setPopupVisible(false);
    }, 6000);

    if (versions.v[version]) {
      setCurrentVersionClasses(versions.v[version].classes);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (versions.v[selectedVersion]) {
      setCurrentVersionClasses(versions.v[selectedVersion].classes);
    }
  }, [selectedVersion]);

  const handleOptionSelect = () => {
    setMenuVisible(false);
  };

  return (
    <div>
      <div className={`sidebar ${menuVisible ? 'visible' : ''}`} ref={sidebarRef}>
        <h2>AtosJS</h2>
        <ul className={`nav-links ${menuVisible ? 'visible' : ''}`}>
          <li className="dropdown">
            <a
              href="#"
              className={`${versionsDropdownVisible ? 'dropdown-active' : ''}`}
              onClick={toggleVersionsDropdown}
            >
              <FaHistory /> <span>Versions</span>
            </a>
            {versionsDropdownVisible && (
              <ul className="dropdown-menu visible">
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      handleVersionChange('latest');
                      handleOptionSelect();
                    }}
                  >
                    <FaStar /> <span>Latest (v2.0.0)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      handleVersionChange('v1.1');
                      handleOptionSelect();
                    }}
                  >
                    <FaTags /> <span>v1.1</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      handleVersionChange('v1');
                      handleOptionSelect();
                    }}
                  >
                    <FaTags /> <span>v1.0</span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <hr className="divider" />

          <li>
            <Link href={`/guide/version/${selectedVersion}`} onClick={handleOptionSelect}>
              <FaBook /> <span>Introduction</span>
            </Link>
          </li>

          {currentVersionClasses.includes('GiftManager') && (
            <li className="dropdown">
              <a
                href="#"
                className={`${optionsDropdownVisible ? 'dropdown-active' : ''}`}
                onClick={toggleOptionsDropdown}
              >
                <FaGift /> <span>GiftManager</span>
              </a>
              {optionsDropdownVisible && (
                <ul className="dropdown-menu visible">
                  <li>
                    <Link
                      href={`/guide/version/${selectedVersion}/giftmanager#newgiftmanager`}
                      onClick={handleOptionSelect}
                    >
                      <FaRocket /> <span>Initializing</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/guide/version/${selectedVersion}/giftmanager#generate`}
                      onClick={handleOptionSelect}
                    >
                      <FaPlusCircle /> <span>Generate</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/guide/version/${selectedVersion}/giftmanager#view`}
                      onClick={handleOptionSelect}
                    >
                      <FaSearch /> <span>View</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/guide/version/${selectedVersion}/giftmanager#redeem`}
                      onClick={handleOptionSelect}
                    >
                      <FaCheckCircle /> <span>Redeem</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {currentVersionClasses.includes('TimeFormat') && (
            <li className="dropdown">
              <a
                href="#"
                className={`${TimeFormatDropdownVisible ? 'dropdown-active' : ''}`}
                onClick={toggleTimeFormatDropdown}
              >
                <FaClock /> <span>TimeFormat</span>
              </a>
              {TimeFormatDropdownVisible && (
                <ul className="dropdown-menu visible">
                  <li>
                    <Link
                      href={`/guide/version/${selectedVersion}/timeformat#convert`}
                      onClick={handleOptionSelect}
                    >
                      <FaSearch /> <span>Convert</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/guide/version/${selectedVersion}/timeformat#compare`}
                      onClick={handleOptionSelect}
                    >
                      <FaCheckSquare /> <span>Compare</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>

      {popupVisible && (
        <div className="popup">
          <span>
            <FaCheckCircle /> {popupMessage}
          </span>
        </div>
      )}
    </div>
  );
};
