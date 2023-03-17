export interface CliCommandInterface {
  execute(...parameters: string[]): void;
}
