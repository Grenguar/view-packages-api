import Self from "./self";

export default interface HALlink {
  _links: Self;
  id: string;
  name: string;
}
