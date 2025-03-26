# WerZatSong

WerZatSong is a tool for identifying songs from audio files using different matching methods: **Audfprint, Audiotag, MusicBrainz (AcoustID) and Shazam**. You can run a single mode or combine multiple modes. If multiple modes are specified, they will execute in the following order of priority:

1. **MusicBrainz** (AcoustID)
2. **Audiotag**
3. **Shazam**
4. **Audfprint**

## Installation and Requirements

Before installing WerZatSong, make sure you meet the following requirements:

### System Requirements

- [**Node.js**](https://nodejs.org) (v20.0 or higher) → Verify on your terminal with `node -v` and `npm -v`
- [**Python**](https://www.python.org/downloads) (v3.10 or higher) → Verify on your terminal with `python --version` and `pip --version`
- [**FFmpeg**](https://www.ffmpeg.org/download.html) → Verify on your terminal with `ffmpeg -version`

### Installation

1. **Download WerZatSong** repository as a ZIP file (**<> Code** → **Download ZIP**)
2. **Extract** the ZIP file to your desired location
3. Open a terminal and navigate to the extracted folder:

```bash
cd werzatsong
```

4. Install Node.js dependencies:

```bash
npm install
```

5. Install Python dependencies:

```bash
pip install -r requirements.txt
pip install audioop-lts
```

## Configuration Setup

Before using WerZatSong, you need the following:
- **Discord Webhook URL** (required to receive possible match notifications)
- **Audiotag API key** (required to use Audiotag search mode)
- **AcoustID API key** (required to use MusicBrainz/AcoustID search mode)

### How to Get a Discord Webhook URL

1. Open Discord and create your own server
2. On the default **#general** text channel click on **Edit Channel**
3. Go to **Integrations** → **Webhooks**
4. Click **Create Webhook** and once created go inside it
5. Click the **Copy Webhook URL** and paste it when prompted in the next section

### How to Get an Audiotag API Key

1. Go to the [Audiotag](https://audiotag.info) website
2. Create a new account or login if you already have one
3. Go to the [**User Section**](https://user.audiotag.info) and click on the **API keys** tab
4. Click on the **Create new API key** button
5. Copy it and paste the **API key** when prompted in the next section

### How to Get an AcoustID API Key

1. Go to the [AcoustID](https://acoustid.org) website
2. Create a new account or login if you already have one
3. Go to [**My Applications**](https://acoustid.org/my-applications) and click on the **Register a new application** button
4. Fill out the fields with random information and click **Register** button
5. Copy the application's **API key** and paste it when prompted in the next section

### Initial WerZatSong Setup

Now in order to set up the required folders and configurations. Run the following command:
```bash
node werzatsong.js --audiotag --musicbrainz
```

On the **first run**, this will:

- Generate all necessary folders
- Prompt you to **enter your Discord Webhook URL**
- Prompt you to **enter your Audiotag API key**
- Prompt you to **enter your AcoustID API key**
- Exit automatically after setup is complete

## How to Use WerZatSong

1. Place the MP3 files you want to check inside the **`input`** folder (automatically created after the setup)
2. Run WerZatSong with your desired mode(s). Usage example with all modes enabled:

```bash
node werzatsong.js --audfprint --audiotag --musicbrainz --shazam
```

### General Options

- **`--trim <seconds>`** → Shortens `input` MP3 files to the specified length before processing (recommended for speed improvement if you input long duration files)

## Execution Modes

### 1. Audfprint

Uses **audfprint** to compare audio snippets against a fingerprints database:

```bash
node werzatsong.js --audfprint
```

#### Audfprint Fingerprints Database Setup

- Download the **PKLZ fingerprints database** from the [**Google Drive Repository**](https://drive.google.com)
- Put the folders you just downloaded inside the **`database`** folder (automatically created after the setup)
- The database is **split into subfolders** based on the **genres** or **sources** of the PKLZ files
- Your `database` folder should look like this:

  ![Database Folder](images/database.png)

#### Additional Audfprint Options

- **`--folder <subfolder>`** → Selects a specific subfolder inside the `database` folder. This is useful if you want to search only within a certain genre or source instead of processing all PKLZ files from all folders at once
- **`--threads <number>`**: Sets the number of processing threads (default: all available cores, max: 8)

Example usage:

```bash
node werzatsong.js --audfprint --folder "lyon-funk" --trim 60 --threads 4
```

This example will:
- Search for matches **only in the `lyon-funk` fingerprints subfolder** of the `database`
- Trim all the MP3 files you put on the `input` folder to 60 seconds for faster processing
- Use a total of **4 parallel threads** for processing

### 2. Audiotag

Uses the Audiotag API to search for matches in its database:

```bash
node werzatsong.js --audiotag
```

### 3. MusicBrainz (AcoustID)

Uses MusicBrainz (AcoustID API) to identify songs through audio fingerprints:

```bash
node werzatsong.js --musicbrainz
```

#### Additional MusicBrainz Options

- **`--duration <min:max>`** → Sets the song duration range in seconds in which MusicBrainz will search for to find matches (format: `"min:max"`, default: `"140:360"`)
- **`--extension <seconds>`** → Extends MP3 files by the specified number of seconds before MusicBrainz analysis (default: `10`)

### 4. Shazam

Uses the official Shazam API to identify songs:

```bash
node werzatsong.js --shazam
```

## Where To Find Results

- Results logs are stored in the **`logs`** folder after the execution finishes
- Each time a possible match is found it will be sent to your **Discord Webhook**

## Development Credits

Developed by **Nel** with contributions from **Numerophobe**, **AzureBlast** and **Mystic65**
