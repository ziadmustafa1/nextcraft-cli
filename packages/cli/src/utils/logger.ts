import chalk from 'chalk';
import ora, { Ora } from 'ora';

export class Logger {
  private spinner: Ora | null = null;

  info(message: string): void {
    console.log(chalk.blue('ℹ'), message);
  }

  success(message: string): void {
    console.log(chalk.green('✔'), message);
  }

  warn(message: string): void {
    console.log(chalk.yellow('⚠'), message);
  }

  error(message: string): void {
    console.log(chalk.red('✖'), message);
  }

  startSpinner(message: string): void {
    this.spinner = ora(message).start();
  }

  updateSpinner(message: string): void {
    if (this.spinner) {
      this.spinner.text = message;
    }
  }

  succeedSpinner(message?: string): void {
    if (this.spinner) {
      this.spinner.succeed(message);
      this.spinner = null;
    }
  }

  failSpinner(message?: string): void {
    if (this.spinner) {
      this.spinner.fail(message);
      this.spinner = null;
    }
  }

  log(message: string): void {
    console.log(message);
  }

  newLine(): void {
    console.log();
  }

  box(message: string): void {
    const lines = message.split('\n');
    const maxLength = Math.max(...lines.map((l) => l.length));
    const border = '─'.repeat(maxLength + 2);

    console.log(chalk.cyan(`┌${border}┐`));
    lines.forEach((line) => {
      const padding = ' '.repeat(maxLength - line.length);
      console.log(chalk.cyan('│'), line + padding, chalk.cyan('│'));
    });
    console.log(chalk.cyan(`└${border}┘`));
  }

  title(message: string): void {
    console.log(chalk.bold.cyan(`\n${message}\n`));
  }
}

export const logger = new Logger();
