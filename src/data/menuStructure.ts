import { MenuItem } from '@/types/giftbox';

export const menuHamburgerRO: MenuItem[] = [
  {
    title: "Acasă",
    href: "/"
  },
  {
    title: "Gift BOX-uri",
    children: [
      { title: "Toate Gift BOX-urile", href: "/products" },
      { title: "Creează-ți Propriul Gift BOX", href: "/create-box" },
      { title: "Gift BOX-uri cu Vin", tag: "vin" },
      { title: "Gift BOX-uri Fără Alcool", tag: "fara-alcool" },
      { title: "Cutii Cadou", tag: "cutie-cadou" },
    ]
  },
  {
    title: "Destinatar",
    children: [
      { title: "Pentru Ea", tag: "pentru-ea" },
      { title: "Pentru El", tag: "pentru-el" },
      { title: "Pentru Copii", tag: "pentru-copii" },
      { title: "Pentru Bebeluși", tag: "pentru-bebelusi" },
      { title: "Pentru Colegi", tag: "pentru-colegi" },
      { title: "Pentru Gurmanzi", tag: "pentru-gurmanzi" },
      { title: "Pentru Familie", tag: "pentru-familie" },
      { title: "Pentru Cuplu", tag: "pentru-cuplu" },
    ]
  },
  {
    title: "Ocazie",
    children: [
      { title: "Crăciun", tag: "craciun" },
      { title: "Aniversare", tag: "aniversare" },
      { title: "Onomastică", tag: "onomastica" },
      { title: "Familie", tag: "familie" },
      { title: "Secret Santa", tag: "secret-santa" },
      { title: "Corporate Gifts", tag: "corporate-gifts" },
    ]
  },
  {
    title: "Buget",
    children: [
      { title: "Sub 150 lei", tag: "buget" },
      { title: "150–250 lei", tag: "standard" },
      { title: "250–450 lei (Premium)", tag: "premium" },
      { title: "Peste 450 lei (Luxury)", tag: "luxury" },
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
