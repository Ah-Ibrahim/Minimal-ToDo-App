export interface TodoBody {
  text: string;
  isCompleted: boolean;
}

export interface TodoType extends TodoBody {
  id: string;
}
