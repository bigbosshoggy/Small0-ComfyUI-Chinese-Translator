# Small0 Quick Translator

A custom ComfyUI node powered by Google Gemini that translates and optimizes prompts for various Stable Diffusion checkpoints (SDXL, Pony, Flux, etc.).

## Installation

Since this is a custom node for ComfyUI, follow these steps to install it:

1.  **Navigate to Custom Nodes Directory**:
    Open your terminal or command prompt and navigate to your ComfyUI installation folder:
    ```bash
    cd ComfyUI/custom_nodes/
    ```

2.  **Clone the Repository**:
    Clone this node into the directory:
    ```bash
    git clone https://github.com/your-username/small0-quick-translator.git
    ```

3.  **Restart ComfyUI**:
    Restart your ComfyUI server to load the new node.

## Configuration (API Key)

**No `.env` file is required.**

This node is designed to use the system's environment variables for security.
*   **Web/Cloud**: The API key is automatically injected via the platform.
*   **Local ComfyUI**: Ensure you have your `GEMINI_API_KEY` set in your system environment variables or your main ComfyUI launch script. The node will detect it automatically.

## Usage 

1.  **Locate Node**: Right-click on the canvas -> `Small0` -> `Quick Translator`.
2.  **Inputs**:
    *   `prompt`: Connect your English text or string primitive.
    *   `checkpoint`: Select the target model type (e.g., Pony V6, SDXL).
    *   `intelligence_mode`: Enable to let Gemini re-structure the tags/prose for the specific model. Disable for direct translation.
3.  **Outputs**:
    *   `string`: The translated and optimized Chinese prompt.
