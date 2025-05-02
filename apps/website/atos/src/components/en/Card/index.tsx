import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { PiCrownSimpleFill } from "react-icons/pi";
import { MdFiberNew } from "react-icons/md";
import { TiPinOutline } from "react-icons/ti";
import { FiCode, FiUsers, FiTrendingUp, FiGithub } from "react-icons/fi";
import { TfiCrown } from "react-icons/tfi";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface ButtonProps {
  href: string;
  text: string;
  icon: React.ReactNode;
}

interface CardProps {
  bannerImage?: StaticImageData | string;
  image?: StaticImageData | string;
  name: string;
  description: string;
  tags: number[];
  isOwner?: boolean;
  isNews?: boolean;
  isPinned?: boolean;
  button?: ButtonProps;
  github?: string;
}

const TAGS_MAP: Record<number, string> = {
  1: "Founder",
  2: "Developer",
  3: "Investor",
  4: "Contributor",
  5: "Backend",
  6: "Frontend",
  7: "Fullstack",
  8: "Designer",
};

const TAGS_COLOR_MAP: Record<number, string> = {
  1: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  2: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  3: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  4: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  5: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  6: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  7: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  8: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
};

const TAGS_ICON_MAP: Record<number, React.JSXElementConstructor<any>> = {
  1: TfiCrown,
  2: FiCode,
  3: FiUsers,
  4: FiTrendingUp,
  5: FiCode,
  6: FiCode,
  7: FiCode,
  8: FiCode,
};

export default function Card({
  bannerImage = "https://i.pinimg.com/originals/fe/df/71/fedf7125acf620e856b6d09ef44eee51.gif",
  image = "https://thafd.bing.com/th/id/OIP.GaxpwoovNxibAwWzikVL4wHaHZ?rs=1&pid=ImgDetMain",
  name,
  description,
  tags,
  isOwner = false,
  isNews = false,
  isPinned = false,
  button,
  github,
}: CardProps) {
  return (
    <div className="relative max-w-sm w-full bg-background shadow-lg rounded-2xl overflow-hidden mx-auto transition hover:scale-[1.02] hover:shadow-2xl">
      {isPinned && (
        <TiPinOutline className="absolute top-2 left-2 w-6 h-6 text-gray-500 dark:text-gray-200 z-10" />
      )}

      {/* Banner */}
      <div className="relative h-40 w-full">
        <Image src={bannerImage} alt="Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4 -mt-10">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={image}
              alt={name}
              className="rounded-full object-cover border-4 border-white dark:border-gray-800"
              fill
            />
            {isNews && (
              <MdFiberNew className="absolute -bottom-1 -right-1 w-6 h-6" />
            )}
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          {isOwner && <PiCrownSimpleFill className="w-6 h-6 text-yellow-400" />}
        </div>

        <p className="text-gray-600 dark:text-gray-300">{description}</p>

        <div className="flex items-center gap-2">
          <IoMdInformationCircleOutline size="1.25rem" />
          <h2 className="text-lg">About:</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags
            .sort((a, b) => a - b)
            .map((tag) => {
              const Icon = TAGS_ICON_MAP[tag];
              return (
                <span
                  key={tag}
                  className={`${TAGS_COLOR_MAP[tag]} flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium`}
                >
                  <Icon className="w-4 h-4" />
                  {TAGS_MAP[tag]}
                </span>
              );
            })}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-6">
          {button && (
            <Link
              href={button.href}
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
            >
              {button.text}
              <span className="w-4 h-4 flex-shrink-0">{button.icon}</span>
            </Link>
          )}
          {github && (
            <div className="ml-auto">
              <Link
                href={"https://github.com/" + github}
                className="inline-flex items-center gap-2 px-4 py-2"
              >
                <FiGithub className="w-6 h-6" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}