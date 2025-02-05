import { Plugin, Vault } from "obsidian";
import { updateIndex, IndexSettings } from "./indexLibrary"; // Import your library functions
import { IndexPluginSettingTab } from "./settingsTab";

const DEFAULT_SETTINGS: IndexSettings = {
  indexFileName: "Index.md",
  previousIndexFileName: null,
  ignoredPatterns: "^\\.syncthing,\\(conflicted copy\\)",
};

export default class IndexPlugin extends Plugin {
  settings: IndexSettings;

  async onload() {
    console.log("Loading Index Plugin");

    // Load settings
    await this.loadSettings();

    // Add settings tab
    this.addSettingTab(new IndexPluginSettingTab(this.app, this));

    // Register Vault event listeners
    this.registerEventListeners();
  }

  async handleSettingsChange(
    newIndexFileName: string,
    vault: Vault
  ): Promise<void> {
    const previousIndexFileName = this.settings.indexFileName;

    // Update the index file name in settings
    this.settings.indexFileName = newIndexFileName;
    await this.saveSettings();

    // Update the indices for all affected folders
    const rootPath = vault.getRoot().path;
    await updateIndex(vault, rootPath, this.settings, previousIndexFileName);
  }

  onunload() {
    console.log("Unloading Index Plugin");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  registerEventListeners() {
    const vault = this.app.vault;

    // File created
    vault.on("create", (file) => {
      console.log(`File created: ${file.path}`);
      this.handleFileChange(file.path);
    });

    // File deleted
    vault.on("delete", (file) => {
      console.log(`File deleted: ${file.path}`);
      this.handleFileChange(file.parent?.path ?? "");
    });

    // File renamed
    vault.on("rename", (file, oldPath) => {
      const vault = this.app.vault;

      // Check if the new path exists using Obsidian's API
      const newFile = vault.getAbstractFileByPath(file.path);
      const parentFile = vault.getAbstractFileByPath(file.parent?.path ?? "");

      if (!newFile || !parentFile) {
        console.log(
          `Skipped: Path does not exist (newPath: ${file.path}, parentPath: ${file.parent?.path})`
        );
        return;
      }

      console.log(`Folder renamed from ${oldPath} to ${file.path}`);

      setTimeout(() => {
        // Update the renamed folder's index
        this.handleFileChange(file.path);
        // Update the parent directory's index to reflect the rename
        this.handleFileChange(file.parent?.path ?? "");
      }, 100);
    });
  }

  handleFileChange(folderPath: string) {
    if (!folderPath) return;

    const indexSettings: IndexSettings = {
      ...this.settings,
    };

    updateIndex(this.app.vault, folderPath, indexSettings);
  }
}
