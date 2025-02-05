import { TFolder, Vault, normalizePath } from "obsidian";

export const syncthingIgnorePatterns: RegExp[] = [
  /^\.syncthing/, // Ignore temp files like .syncthing.filename.tmp
  /\(conflicted copy\)/, // Ignore conflict files
];

export interface IndexSettings {
  indexFileName: string; // Current index file name
  previousIndexFileName: string | null; // Cached previous index file name
  ignoredPatterns: string; // Comma-separated list of regex patterns
}

/**
 * Converts a string to a human-readable name by capitalizing words
 * and replacing underscores/dashes with spaces.
 * @param str The input string
 * @returns The human-readable string
 */
export function toHumanName(str: string): string {
  return str.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Updates the index file in the specified folder based on the given settings.
 * @param vault The Obsidian Vault API instance
 * @param folderPath The path to the folder for which to generate the index
 * @param settings The settings object containing the index file name and ignored patterns
 * @param previousIndexFileName Optional parameter to delete the outdated index file
 */
export async function updateIndex(
  vault: Vault,
  folderPath: string,
  settings: IndexSettings,
  previousIndexFileName?: string
): Promise<void> {
  try {
    const normalizedFolderPath = normalizePath(folderPath);
    const { ignoredPatterns, indexFileName } = settings;

    // Get the folder object
    const folder = vault.getAbstractFileByPath(normalizedFolderPath) as TFolder;
    if (!(folder instanceof TFolder)) {
      console.log(`Skipped updating index: Not a valid folder (${folderPath})`);
      return;
    }

    // Remove outdated index file
    if (previousIndexFileName && previousIndexFileName !== indexFileName) {
      const oldIndexFilePath = normalizePath(
        `${normalizedFolderPath}/${previousIndexFileName}`
      );
      if (await vault.adapter.exists(oldIndexFilePath)) {
        console.log(`Removing outdated index file: ${oldIndexFilePath}`);
        await vault.adapter.remove(oldIndexFilePath);
      }
    }

    // Create the new index file
    const indexFilePath = normalizePath(
      `${normalizedFolderPath}/${settings.indexFileName}`
    );
    const parentPath = folder.parent?.path || "";
    const relativeParentLink = normalizePath(
      `${parentPath}/${settings.indexFileName}`
    );

    let content = `# ${toHumanName(
      folder.name
    )} [[${relativeParentLink}|Back to ${toHumanName(
      folder.parent?.name || "Root"
    )}]]\n\n`;

    const links = folder.children
      .filter(
        (child) =>
          child.name !== settings.indexFileName &&
          !settings.ignoredPatterns
            .split(",")
            .some((pattern) => new RegExp(pattern).test(child.name))
      )
      .map((child) => {
        const displayName = toHumanName(child.name.replace(/\.[^/.]+$/, ""));
        return child instanceof TFolder
          ? `- [[${child.path}/${settings.indexFileName}|${displayName}]]`
          : `- [[${child.path}|${displayName}]]`;
      });

    content += links.join("\n") + "\n";

    // Write the new index file
    await vault.adapter.write(indexFilePath, content);
    console.log(`Updated index at ${indexFilePath}`);
  } catch (error) {
    console.error(`Failed to update index for ${folderPath}:`, error);
  }
}
