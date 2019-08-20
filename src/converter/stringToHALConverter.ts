import HALlink from "../domain/halLink";
import Self from "../domain/self";

export default class StringToHALConverter {
  public static convert(name: string, hostPath: string): HALlink {
    let href: string = `http://${hostPath}/${name}-name`;
    if (name.indexOf("|") > -1) {
      name = "null";
      href = "null";
    }
    const self: Self = {
      self: {
        href: href
      }
    };
    return {
      _links: self,
      name: name
    };
  }
}
