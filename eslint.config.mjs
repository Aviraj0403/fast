import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, { rules: { "react-hooks/set-state-in-effect": "off" } }, { ignores: [".next/**", "node_modules/**", "test-results/**", "next-env.d.ts"] }];

export default eslintConfig;
