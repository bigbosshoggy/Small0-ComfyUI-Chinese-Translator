import { CheckpointType } from './types';

export const CHECKPOINTS = [
  { value: CheckpointType.SD15, label: 'Stable Diffusion 1.5' },
  { value: CheckpointType.SDXL, label: 'SDXL 1.0 / Lightning' },
  { value: CheckpointType.FLUX, label: 'Flux.1 Dev/Schnell' },
  { value: CheckpointType.PONY, label: 'Pony V6 (Anime)' },
  { value: CheckpointType.REALISTIC, label: 'Realistic Vision' },
  { value: CheckpointType.ILLUSTRATION, label: '2D Illustration' },
];

export const DEFAULT_PROMPT = "A futuristic city with neon lights, raining, cyberpunk aesthetic, detailed texture, 8k resolution";

// This simulates the 'node' color from ComfyUI
export const NODE_HEADER_COLOR = "bg-[#35515e]"; // A nice muted teal/blue often used for utility nodes
export const NODE_BODY_COLOR = "bg-[#222222]";
export const INPUT_BG_COLOR = "bg-[#1a1a1a]";
export const TEXT_COLOR = "text-[#cccccc]";
export const ACCENT_COLOR = "text-cyan-400";