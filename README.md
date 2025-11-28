# Small0 Quick Translator (ComfyUI Node)

A custom ComfyUI node powered by Google Gemini that translates and optimizes prompts for various Stable Diffusion checkpoints (SDXL, Pony, Flux, etc.).

It features an "Intelligence Mode" where Gemini optimizes the Chinese translation structure based on the specific artistic style of the selected checkpoint (e.g., using tag-like structures for Pony/Anime models vs natural language for SDXL).

## Installation

### Method 1: ComfyUI Manager (Git URL)
1.  Open ComfyUI Manager.
2.  Click **Install via Git URL**.
3.  Paste the repository URL: `https://github.com/bigbosshoggy/small0-quick-translator`

### Method 2: Manual Clone
1.  Navigate to your ComfyUI `custom_nodes` directory:
    ```bash
    cd ComfyUI/custom_nodes/
    ```
2.  Clone the repo:
    ```bash
    git clone https://github.com/bigbosshoggy/small0-quick-translator.git
    ```
3.  Install dependencies:
    ```bash
    pip install -r small0-quick-translator/requirements.txt
    ```

## Usage

1.  **Add Node**: Right-click canvas -> `Small0` -> `Quick Translator`.
2.  **Inputs**:
    *   `api_key`: Enter your Google Gemini API Key here (STRING). You can get one from [Google AI Studio](https://aistudio.google.com/).
    *   `text`: Connect your prompt (STRING).
    *   `checkpoint`: Select target model (e.g., Pony V6, SDXL).
    *   `intelligence_mode`: 
        *   `True`: Gemini restructures the prompt for the model.
        *   `False`: Direct literal translation.
