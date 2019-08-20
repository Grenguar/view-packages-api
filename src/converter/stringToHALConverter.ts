import HALlink from "../domain/halLink";
import Self from "../domain/self";

export default class StringToHALConverter {
  public static convert(name: string, hostPath: string): HALlink {
    const self: Self = {
      self: {
        href: `http://${hostPath}/${name}-name`
      }
    };
    return {
      _links: self,
      id: name,
      name: name
    };
  }
}
