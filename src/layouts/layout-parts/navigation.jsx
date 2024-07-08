// CUSTOM ICON COMPONENT
import duotone from "icons/duotone";

// type ChildItem = { name: string; path: string };

// type ChildItemWithChildren = {
//   name: string;
//   path: string;
//   children?: ChildItemWithChildren[];
// };
export const navigations = [{
  type: "label",
  label: "MENU"
}, {
  name: "Dashboard",
  path: "/",
  icon: duotone.PersonChalkboard
},
{
  name: "portfolio",
  icon: duotone.DiagramProject,
  path: "/portfolio"
},
{
  name: "budget_strategy",
  icon: duotone.BadgeDollar,
  path: "/budget-strategies"
},
{
  name: "personal_method",
  icon: duotone.SignalMethod,
  path: "/personal-methods"
}
];