import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import Card from "@/components/en/Card";

export default function Developers() {
  return (
    <>
      <section className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          image="https://i.imgur.com/crKMa5j.jpg"
          bannerImage="https://truth.bahamut.com.tw/s01/201907/bac54e76fc4ff5b3691357c90c950bbb.JPG"
          name="Israel R. Jatobá"
          description="I’m Rabi, a beginner in the programming world, and I build projects in my spare time."
          tags={[1, 2, 7]}
          // button={{
          //   href: '/profile/israel',
          //   text: 'Learn more',
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
