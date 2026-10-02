// Lets TypeScript understand `import mascot from "@/assets/images/mascot.png"`.
// Metro turns these imports into image sources at build time.
declare module "*.png" {
  import type { ImageSourcePropType } from "react-native";

  const source: ImageSourcePropType;
  export default source;
}
