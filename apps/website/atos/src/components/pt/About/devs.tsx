import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import Card from "@/components/Card";

export default function Devs() {
  return (
    <>
      <section className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          image="https://i.imgur.com/crKMa5j.jpg"
          bannerImage="https://images.wallpapersden.com/image/download/digital-roronoa-zoro-minimal-one-piece-art_bmdna2aUmZqaraWkpJRmbmdsrWZlbWU.jpg"
          name="Israel R. Jatobá"
          description="Eu sou o Rabi, um iniciante no mundo da programação e faço projetos nas horas vagas."
          tags={[1, 2, 7]}
          // button={{
          //   href: '/profile/israel',
          //   text: 'Saiba mais',
          //   icon: <FaArrowUpRightFromSquare />
          // }}
          github="yeyTaken"
          isPinned
          isOwner
        />
        <Card
          image="https://media.discordapp.net/attachments/1217981901957107744/1367538097348284416/IMG_20250401_190928_513.webp?ex=6814f29a&is=6813a11a&hm=0b1ab63210c22369e930c0836a115444f36c2a5ee6f5f8b49b49a54a2b126b2a&=&format=webp&width=705&height=705"
          bannerImage="https://media.discordapp.net/attachments/1217981901957107744/1367538098149523617/1741825630485_1.png?ex=6814f29a&is=6813a11a&hm=510be0788d922ee528d48617d751474a11ea7164c021f06bd8cd1553c8d987e2&=&format=webp&quality=lossless&width=1430&height=451"
          name="0xViny"
          description="Estudante de desenvolvimento de software • Backend & Frontend • Java & Typescript • Sempre aprendendo."
          tags={[2, 7]}
          button={{
            href: "https://0xviny-dev.vercel.app/",
            text: "Portifólio",
            icon: <FaArrowUpRightFromSquare />,
          }}
          github="0xviny"
        />
      </section>
    </>
  );
}
