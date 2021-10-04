export enum ShuffleTypeLabel {
  NONE = 0,
  E2H = 1,
  RANDOM = 3,
  H2E = 4,
}

export const shuffleTypes: ShuffleType[] = [
  {
    value: ShuffleTypeLabel.NONE,
    label: "Mặc định",
  },
  {
    value: ShuffleTypeLabel.E2H,
    label: "Từ dễ tới khó",
  },
  {
    value: ShuffleTypeLabel.RANDOM,
    label: "Ngẫu nhiên",
  },
  {
    value: ShuffleTypeLabel.H2E,
    label: "Từ khó tới dễ",
  },
];
export interface ShuffleType {
  label: string;
  value: any;
}
