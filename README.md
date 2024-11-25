# Building-a-feature-to-showcase-the-capabilities-of-AssemblyAI-s-Universal-2-model
This VS Code extension transcribes audio files and integrates the output into your code editor with proper formatting, timestamps, and proper nouns. 



1. Prerequisites
Before starting, ensure you have the following installed:

Node.js: Download and install from Node.js official site.
Visual Studio Code: Install from VS Code official site.
AssemblyAI API Key: Sign up and generate an API key from AssemblyAI.
2. Set Up the Project
Create a New Project Folder:

bash
Copy code
mkdir assemblyai-vscode-extension
cd assemblyai-vscode-extension
Initialize the Node.js Project:

bash
Copy code
npm init -y
This will create a package.json file.

Install Required Dependencies: Install Axios for API requests:

bash
Copy code
npm install axios
3. Create the Script
Create a new file in the project folder:

bash
Copy code
touch transcribe.js
Paste the transcription code snippet into transcribe.js.

Replace your-assemblyai-api-key with your actual API key.

Save the file.

4. Run the Script in VS Code
Open the Project Folder in VS Code:

Open VS Code.
Use File > Open Folder and select your project folder.
Run the Script:

Open the transcribe.js file in VS Code.
Use the Terminal in VS Code:
Go to View > Terminal or press Ctrl+`.
Run the script:
bash
Copy code
node transcribe.js
Output:

If everything is set up correctly, you'll see the transcription progress in the terminal.
Once completed, the transcription text will appear in the terminal.

