/// <reference path="references.ts" />

var pty = require('pty.js');
var AnsiParser: AnsiParserConstructor = require('node-ansiparser');

module BlackScreen {

    // TODO: Separate input from output.
    export class Invocation extends EventEmitter {
        buffer: Buffer;
        command: NodeJS.Process;
        parser: AnsiParser;

        constructor(private directory: string,
                    private dimensions: Dimensions,
                    private history: History) {
            super();

            this.buffer = new Buffer();

            this.buffer.on('data', () => {
                this.emit('data', this);
            });

            this.parser = new AnsiParser({
                inst_p: (text: string) => {
                    for (var i = 0; i != text.length; ++i) {
                        this.buffer.write(new Char(text.charAt(i)));
                    }
                },
                inst_o: function (s: any) {
                    console.error('osc', s);
                },
                inst_x: (flag: string) => {
                    this.buffer.write(new Char(flag));
                },
                inst_c: function (collected: any, params: any, flag: any) {
                    console.error('csi', collected, params, flag);
                },
                inst_e: function (collected: any, flag: any) {
                    console.error('esc', collected, flag);
                }
            });

        }

        execute(commandName: string): void {
            var parts = this.expandCommand(commandName);
            var expanded = parts.join(' ');

            this.history.append(expanded);

            var commandName = parts.shift();

            this.command = pty.spawn(commandName, parts, {
                cols: this.dimensions.columns,
                rows: this.dimensions.rows,
                cwd: this.directory,
                env: process.env
            });

            this.command.on('data', (data) => {
                this.parser.parse(data);
            }).on('end', () => {
                this.command = null;
                this.emit('end');
            })
        }

        expandCommand(command: string): Array<string> {
            // Split by comma, but not inside quotes.
            // http://stackoverflow.com/questions/16261635/javascript-split-string-by-space-but-ignore-space-in-quotes-notice-not-to-spli
            var parts = command.match(/(?:[^\s']+|'[^']*')+/g);
            var commandName = parts.shift();

            var alias: string = Aliases.find(commandName);

            if (alias) {
                parts = this.expandCommand(alias).concat(parts);
            } else {
                parts.unshift(commandName);
            }

            return parts;
        }

        resize(dimensions: Dimensions) {
            this.dimensions = dimensions;

            if (this.command) {
                this.command.kill(this.command.pid, 'SIGWINCH');
            }
        }
    }

}