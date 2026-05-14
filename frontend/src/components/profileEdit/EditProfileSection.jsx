import { motion } from "framer-motion";
import {
  sectionDescriptionClass,
  sectionEyebrowClass,
  sectionShell,
  sectionTitleClass,
} from "./styles";

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const EditProfileSection = ({
  id,
  eyebrow,
  title,
  description,
  accent = "from-cyan-400/70 via-sky-300/25 to-transparent",
  children,
}) => {
  return (
    <motion.section
      id={id}
      className={`${sectionShell} scroll-mt-28 overflow-hidden`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.24 }}
      variants={sectionVariants}
    >
      <div className={`h-px bg-gradient-to-r ${accent}`} />

      <div className="px-5 py-6 sm:px-6 sm:py-7">
        <div>
          <p className={sectionEyebrowClass}>{eyebrow}</p>
          <h2 className={sectionTitleClass}>{title}</h2>
          {description ? (
            <p className={sectionDescriptionClass}>{description}</p>
          ) : null}
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </motion.section>
  );
};

export default EditProfileSection;
