import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import Card from "@/components/pt/Card";

export default function Devs() {
  return (
    <>
      <section className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          image="https://i.imgur.com/crKMa5j.jpg"
          bannerImage="https://truth.bahamut.com.tw/s01/201907/bac54e76fc4ff5b3691357c90c950bbb.JPG"
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
      </section>
    </>
  );
}
