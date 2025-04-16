import React from "react";

type ModalState = {
  active: boolean;
  index: number;
};

interface CocktailTitleProps {
  index: number;
  title: string;
  category: string;
  setModal: (state: ModalState) => void;
}
const CocktailTitle: React.FC<CocktailTitleProps> = ({
  index,
  title,
  setModal,
  category,
}) => {
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="flex w-full justify-between items-center py-[50px] cursor-pointer border-t border-t-[rgb(201,201,201)] transition-all duration-200
    last:border-b last:border-b-[rgb(201,201,201) hover:opacity-50
    group"
    >
      <h2
        className="text-[60px] m-0 font-normal
      transition-all duration-400
      group-hover:-translate-x-[10px]"
      >
        {title}
      </h2>
      <p
        className="transition-all duration-400 font-light
      group-hover:translate-x-[10px]"
      >
        {category} based Cocktail
      </p>
    </div>
  );
};

export default CocktailTitle;
