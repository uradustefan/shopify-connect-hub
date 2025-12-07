import { MenuItem } from '@/types/giftbox';

export const menuHamburgerRO: MenuItem[] = [
  {
    title: "Crăciun",
    children: [
      {
        title: "Gift BOX",
        children: [
          { title: "Gift BOX de Crăciun", tag: "craciun" },
          { title: "Gift BOX cu Vin", tag: "vin" },
          {
            title: "GIFT BOX după Preț",
            children: [
              { title: "de la 150 RON", tag: "pret-150" },
              { title: "de la 250 RON", tag: "pret-250" },
              { title: "de la 500 RON", tag: "pret-500" },
              { title: "de la 1000 RON", tag: "pret-1000" },
            ]
          },
        ]
      },
      {
        title: "Cadouri de Crăciun",
        children: [
          { title: "Pentru Ea", tag: "pentru-ea" },
          { title: "Pentru El", tag: "pentru-el" },
          { title: "Pentru Cei Mici", tag: "pentru-copii" },
          { title: "Pentru Gurmanzi", tag: "gurmand" },
          { title: "Cadouri Personalizate", tag: "personalizat" },
          { title: "Carduri Cadou", tag: "card-cadou" },
        ]
      }
    ]
  },
  {
    title: "Gift BOX-uri",
    children: [
      {
        title: "Toate Gift BOX-urile",
        children: [
          { title: "Creează-ți Propriul Gift BOX", href: "/create-box" },
          { title: "Gift BOX-uri cu Vin", tag: "vin" },
          { title: "Gift BOX-uri Fără Alcool", tag: "fara-alcool" },
          { title: "Cutii Cadou", tag: "cutie-cadou" },
        ]
      },
      {
        title: "Gift BOX-uri după Ocazie",
        children: [
          { title: "Crăciun", tag: "craciun" },
          { title: "Zile de Naștere", tag: "zi-nastere" },
          { title: "Corporate", tag: "corporate" },
          { title: "Valentines Day", tag: "valentines" },
          { title: "Ziua Mamei", tag: "ziua-mamei" },
        ]
      },
      {
        title: "Gift BOX-uri după Preț",
        children: [
          { title: "Sub 150 RON", tag: "pret-150" },
          { title: "Sub 250 RON", tag: "pret-250" },
          { title: "Sub 500 RON", tag: "pret-500" },
          { title: "Peste 1000 RON", tag: "pret-1000" },
        ]
      }
    ]
  },
  {
    title: "Creatori",
    children: [
      { title: "Explorează Creatori", href: "/creators" },
      { title: "Devino Creator", href: "/become-creator" },
      { title: "Hall of Fame", tag: "hall-of-fame" },
    ]
  },
  {
    title: "Planuri",
    href: "/pricing"
  },
  {
    title: "Despre Noi",
    href: "/about"
  },
  {
    title: "Contact",
    href: "/contact"
  }
];
