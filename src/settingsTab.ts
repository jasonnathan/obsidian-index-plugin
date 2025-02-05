import { App, PluginSettingTab, Setting } from "obsidian";
import IndexPlugin from "./main";

export class IndexPluginSettingTab extends PluginSettingTab {
  plugin: IndexPlugin;

  constructor(app: App, plugin: IndexPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    const { indexFileName } = this.plugin.settings;

    containerEl.empty();
    containerEl.createEl("h2", { text: "Index Plugin Settings" });

    // Index File Name Setting
    new Setting(containerEl)
      .setName("Index File Name")
      .setDesc("The name of the index file to generate in each folder.")
      .addText((text) =>
        text
          .setPlaceholder("Enter index file name")
          .setValue(this.plugin.settings.indexFileName)
          .onChange(async (value) => {
            const newIndexFileName = value.trim() || indexFileName;
            const vault = this.plugin.app.vault;
            await this.plugin.handleSettingsChange(newIndexFileName, vault);
          })
      );

    // Ignored Patterns Setting
    new Setting(containerEl)
      .setName("Ignored Patterns")
      .setDesc(
        "Comma-separated list of regex patterns to ignore files/folders."
      )
      .addTextArea((textArea) =>
        textArea
          .setPlaceholder("e.g., ^\\.syncthing,\\(conflicted copy\\)")
          .setValue(this.plugin.settings.ignoredPatterns)
          .onChange(async (value) => {
            this.plugin.settings.ignoredPatterns = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
