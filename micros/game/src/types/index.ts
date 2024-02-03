export interface CellData {
  x: number;
  y: number;
  state?: 'neutral' | 'attention' | 'danger' | 'primary' | 'transparent';
}
