export enum ViewType {
  Grid = 'grid',
  Calendar = 'calendar',
  Kanban = 'kanban',
  Form = 'Form',
  Gallery = 'gallery',
  Gantt = 'gantt',
}

export enum FilterConjunction {
  And = 'and',
  Or = 'or',
}

export enum FOperator {
  Is = 'is',
  IsNot = 'isNot',
  Contains = 'contains',
  DoesNotContain = 'doesNotContain',
  IsEmpty = 'isEmpty',
  IsNotEmpty = 'isNotEmpty',
  IsGreater = 'isGreater',
  IsGreaterEqual = 'isGreaterEqual',
  IsLess = 'isLess',
  IsLessEqual = 'isLessEqual',
  IsRepeat = 'isRepeat',
}

export enum FilterDuration {
  ExactDate = 'ExactDate',
  DateRange = 'DateRange',
  Today = 'Today',
  Tomorrow = 'Tomorrow',
  Yesterday = 'Yesterday',
  ThisWeek = 'ThisWeek',
  PreviousWeek = 'PreviousWeek',
  ThisMonth = 'ThisMonth',
  PreviousMonth = 'PreviousMonth',
  ThisYear = 'ThisYear',
  SomeDayBefore = 'SomeDayBefore',
  SomeDayAfter = 'SomeDayAfter',
  TheLastWeek = 'TheLastWeek',
  TheNextWeek = 'TheNextWeek',
  TheLastMonth = 'TheLastMonth',
  TheNextMonth = 'TheNextMonth',
}