import { Vault } from "obsidian";
import { forceFolder } from "../obsidian-reusables/src/indexFiles";
import PluginWithSettings from "../obsidian-reusables/src/PluginWithSettings";

export default class Main extends PluginWithSettings({}) {
	override onload() {
		this.registerPatch(Vault.prototype, {
			getAvailablePathForAttachments(next, plugin) {
				return async function (...args) {
					const activeFile = plugin.app.workspace.getActiveFile();
					if (activeFile && activeFile.extension === "md") {
						await forceFolder(activeFile, plugin.app);
					}
					const res = next.apply(this, args);
					return res;
				};
			},
		});
	}
}
