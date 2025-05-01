import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import Card from "@/components/Card";

export default function About() {
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
          name="Bruno Costa"
          description="Entusiasta de tecnologia e mentor de startups."
          tags={[2, 5]}
        />
        <Card
          name="Lucas Oliveira"
          description="Desenvolvedor com foco no front-end."
          tags={[3]}
        />
        <Card
          name="Ana Clara"
          description="Designer com foco em UI/UX."
          tags={[4, 8]}
          isNews
        />
        <Card
          name="Mariana Santos"
          description="Desenvolvedora com foco em back-end."
          tags={[5, 6]}
          isNews
        />
      </section>
    </>
  );
}
