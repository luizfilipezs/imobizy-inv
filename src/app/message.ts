export enum Severity {
  Success,
  Warning,
  Error
}

export class Message {
  severity: Severity;
  body: string;
}