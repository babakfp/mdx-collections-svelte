import type { Config } from "prettier"
import type { PluginConfig } from "@ianvs/prettier-plugin-sort-imports"

export default {
    semi: false,
    tabWidth: 4,
    plugins: ["@ianvs/prettier-plugin-sort-imports"],
} satisfies Config & PluginConfig
