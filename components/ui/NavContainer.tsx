import Link from "next/link";

import { motion } from "framer-motion";
import { footerLinks, links } from "@/constants/navLinks";
import { perspective, slideIn } from "@/hooks/anim";

export default function Nav({ closeMenu }: { closeMenu: () => void }) {
  return (
    <div className="flex flex-col justify-between pt-[100px] px-[40px] pb-[50px] h-full box-border">
      <div className="flex gap-[10px] flex-col">
        {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div
              key={`b_${i}`}
              className="[perspective:120px] [perspective-origin:bottom]"
            >
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
                className="[transform-style:preserve-3d]"
              >
                <Link
                  href={href}
                  onClick={closeMenu}
                  className="decoration-none text-white text-5xl"
                >
                  {title}
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>
      <motion.div className="flex flex-wrap">
        {footerLinks.map((link, i) => {
          const { title } = link;
          return (
            <motion.a
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={`f_${i}`}
              className="w-1/2 mt-[5px]"
            >
              {title}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
