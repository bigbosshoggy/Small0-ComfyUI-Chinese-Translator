export enum CheckpointType {
  SD15 = 'Stable Diffusion 1.5',
  SDXL = 'SDXL 1.0/Lightning',
  FLUX = 'Flux.1 Dev/Schnell',
  PONY = 'Pony Diffusion V6 (Anime)',
  REALISTIC = 'Realistic Vision / Photo',
  ILLUSTRATION = 'Flat Illustration / Vector',
  Z_IMAGE_TURBO = 'Z-Image-Turbo (Tongyi-MAI)'
}

export interface TranslationRequest {
  prompt: string;
  checkpoint: CheckpointType;
  intelligenceMode: boolean;
}

export interface TranslationResponse {
  translatedText: string;
  originalPrompt: string;
  usedCheckpoint?: string;
}

export interface NodeState {
  prompt: string;
  output: string;
  isProcessing: boolean;
  checkpoint: CheckpointType;
  intelligenceMode: boolean;
  error?: string;
}