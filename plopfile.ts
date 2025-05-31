import type { NodePlopAPI } from "plop";
import { setComponentGenerator } from "./plop/component/generator";
import { setContextGenerator } from "./plop/context/generator";

/** plopを使用したファイルテンプレートを生成する関数 */
export default function (plop: NodePlopAPI): void {
  setComponentGenerator(plop);
  setContextGenerator(plop);
}
