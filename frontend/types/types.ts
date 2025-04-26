// frontend/types/types.ts
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  onToggle?: () => void; // Adicione como opcional
}