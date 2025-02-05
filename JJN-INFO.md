# **JJN-INFO: OBSIDIAN-INDEXCALYPES**  
The end times, but for file organization.
_(A.k.a. "How Did I Magically Generate tons of Index.md Files?")_  

## **What Was I Thinking?**  
So apparently, at some point, I decided that manually organizing my Obsidian vault was **for peasants**. Instead, I must have thought:  

> "You know what I need? A **plugin that auto-generates index files** in every folder, keeps them updated, and logs everything like a judgmental librarian."  

Well, **past me delivered**. And **present me** is both impressed and slightly disturbed because my vault is now **FULL of `Index.md` files**—**and I have no recollection of doing it**.  

Now that I found the culprit, let’s document this **so I don’t freak out in six months**.  

---

## **What This Thing Actually Does**  
✔ **Auto-generates an index file (`Index.md`) in every folder**.  
✔ **Updates said index when files are added, renamed, or deleted**.  
✔ **Excludes garbage files (e.g., `.syncthing`, `conflicted copy`)**.  
✔ **Links each index to its parent folder (because navigation matters).**  
✔ **Has settings to tweak file names and exclusions (because customization).**  
✔ **Runs silently in the background**—until I suddenly realize it has indexed **everything**.  

---

## **Where I Hid Everything (Folder Structure)**  
```plaintext
obsidian-index-plugin
├── src/                        # The actual code
│   ├── main.ts                 # The brain of this operation
│   ├── settingsTab.ts          # UI settings for controlling chaos
│   ├── indexLibrary.ts         # The indexing wizardry
├── package.json                # Pretends this is a serious project
├── esbuild.config.mjs          # Bundles the code into something usable
├── tsconfig.json               # Because TypeScript
├── manifest.json               # The Obsidian plugin manifest
├── .gitignore                  # Hides all the mess
├── README.md                   # A slightly more professional explanation
└── install.sh                  # Install script (if I ever need to reset)
```

---

## **Core Components (a.k.a. The Pieces of the Puzzle)**  

### 📌 **The Brain (`main.ts`)**
- Loads the plugin into Obsidian and sets up event listeners.  
- Watches for **file creation, deletion, and renaming**—then **updates the index accordingly**.  
- Adds a settings tab so **future me** can tweak the index file name or exclusion patterns.  
- **Logs everything** (which is how I figured out this was running in the first place).  

---

### ⚙ **The Settings Panel (`settingsTab.ts`)**
- Lets me change the **index file name** (because `"Index.md"` was getting boring).  
- Allows me to specify **ignored file patterns** (so I don’t index `.obsidian`, `.git`, or other useless files).  
- Uses **Obsidian’s settings UI**, which means **it actually looks decent**.  

---

### 📁 **The Index Generator (`indexLibrary.ts`)**
- Walks through folders like a **digital librarian on steroids**.  
- **Auto-links** each index to its parent (so I can navigate like a boss).  
- Formats file names **nicely** (because "random_text_file-001" is ugly).  
- **Deletes outdated index files** if the file name changes (a level of polish I didn’t expect from myself).  
- **Does NOT crash**—which is frankly impressive.  

---

## **How It Works (Because I Will Forget)**  

### 🔹 **Step 1: Install It**  
1. Clone the repo:  
   ```sh
   git clone https://github.com/seriouslyjs/obsidian-index-plugin.git
   cd obsidian-index-plugin
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Build it:  
   ```sh
   npm run build
   ```
4. Drop it into my **Obsidian plugins folder**:  
   ```sh
   cp -r obsidian-index-plugin ~/.obsidian/plugins/
   ```
5. Enable it in **Obsidian Settings → Community Plugins**.  

---

### 🔹 **Step 2: Watch It Do Its Thing**  
- It **silently creates `Index.md` files** in every folder.  
- When I add/rename/delete a file, **it updates the index automatically**.  
- The **console logs everything** (if I want to feel like a hacker).  

---

## **Why This Is Cool (And Slightly Overkill)**  
✅ **Auto-organizes my notes**—I never have to manually create index files again.  
✅ **Updates itself**—so my vault never becomes outdated.  
✅ **Handles renames & deletions**—so broken links don’t haunt me.  
✅ **Customizable settings**—because sometimes I want `README.md` instead of `Index.md`.  
✅ **Prevents indexing nonsense**—because I refuse to catalog `.DS_Store` files.  

---

## **Things That Could Be Better (Future Me, Fix This)**  
🔴 **Settings are limited**—I should allow more customization (e.g., custom folder structures).  
🔴 **No manual re-indexing option**—Right now, I need to restart Obsidian to force a full refresh.  
🔴 **No multi-language support**—Who cares? I only need English.  
🔴 **File size could be smaller**—Might optimize how settings are stored.  

🚀 **Cool Ideas for Version 2.0:**  
1. **Index multiple folders at once** (batch processing).  
2. **Sync index files across devices** (via cloud storage).  
3. **Fancy UI with stats** (so I can see indexing history).  

---

## **Notes to Future Me**  
📌 **If `Index.md` files randomly appear, it’s because this is still running.**  
📌 **To disable it, remove it from `~/.obsidian/plugins/`** (or turn it off in settings).  
📌 **If indexing slows down, clear the logs and restart Obsidian.**  
📌 **Yes, this is useful. No, you didn’t create all those files manually.**  

---

## **Final Thoughts (Read This Before I Panic Again)**  
This thing **works too well**.  
It has been running **silently** for who-knows-how-long, **generating thousands of index files**—and I had **no idea**.  
It is **both a blessing and a curse**.  

Would I uninstall it? **Never.**  
Would I tweak it? **Probably.**  
Would I forget how it works and freak out again? **100% yes.**  

---

🎤 **Mic Drop:** **Obsidian Index Plugin**—organizing my vault **whether I like it or not**. 😎