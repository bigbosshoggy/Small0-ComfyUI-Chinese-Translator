# Small0 Quick Translator (ComfyUI Node)

A custom ComfyUI node powered by Google Gemini that translates and optimizes prompts for various Stable Diffusion checkpoints (SDXL, Pony, Flux, etc.).

It features an "Intelligence Mode" where Gemini optimizes the Chinese translation structure based on the specific artistic style of the selected checkpoint (e.g., using tag-like structures for Pony/Anime models vs natural language for SDXL).

## Installation

### Method 1: ComfyUI Manager (Git URL)
1.  Open ComfyUI Manager.
2.  Click **Install via Git URL**.
3.  Paste the repository URL for this project.

### Method 2: Manual Clone
1.  Navigate to your ComfyUI `custom_nodes` directory:
    ```bash
    cd ComfyUI/custom_nodes/
    ```
2.  Clone the repo:
    ```bash
    git clone https://github.com/your-username/small0-quick-translator.git
    ```
3.  Install dependencies:
    ```bash
    pip install -r small0-quick-translator/requirements.txt
    ```

## API Key Setup

This node requires a Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/).

### Option A: Environment Variable (Recommended)
Set `GEMINI_API_KEY` in your system environment variables.
*   **Windows (PowerShell)**: `$env:GEMINI_API_KEY="your_key_here"` (or set in System Properties)
*   **Linux/Mac**: `export GEMINI_API_KEY="your_key_here"`

### Option B: Local File
Create a file named `gemini_api_key.txt` inside the `small0-quick-translator` node folder and paste your API key inside it (plain text, no spaces).

## Usage
1.  **Add Node**: Right-click canvas -> `Small0` -> `Quick Translator`.
2.  **Inputs**:
    *   `text`: Connect your prompt (STRING).
    *   `checkpoint`: Select target model (e.g., Pony V6, SDXL).
    *   `intelligence_mode`: 
        *   `True`: Gemini restructures the prompt for the model.
        *   `False`: Direct literal translation.
