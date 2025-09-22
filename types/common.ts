export type DefaultValue = {
  id: string | number;
  name: string;
};

export type DefaultTitleValue = {
  id: string | number;
  title: string;
};

export type TQueryData = {
  size: number;
  skip: number;
  search: string;
  sorting?: string;
  trashOnly?: string;
  filter?: string;

};

export type BooleanOptionType = { id: boolean, name: string }
export function createBooleanOptions(trueLabel: string, falseLabel: string): BooleanOptionType[] {
  return [
    { id: true, name: trueLabel },
    { id: false, name: falseLabel },
  ];
}

export enum BooleanValues {
  YES = "Yes",
  NO = "No",
}

export enum USER_STATUS {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export enum STATUS_VALUES {
  Draft = "draft",
  Published = "published",
  Archived = "archived",
}

export enum VISIBILITY_VALUES {
  Public = "public",
  Private = "private",
}

export type TDashboardQueryData = {
  range: string;
  type: string;
};

export type TDashboardFilter = {
  id: string;
  name: string;
};
