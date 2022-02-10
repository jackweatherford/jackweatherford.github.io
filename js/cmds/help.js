import { cmds, aliases, cmd_list } from "../index.js";

export async function run(args) {
  if (args.length) {
    const first_arg = args[0]?.toLowerCase();
    var aliased = false;
    var cmd = cmds[first_arg];
    if (!cmd) {
      // If no such command
      cmd = cmds[aliases[first_arg]];
      if (cmd) {
        // If it's an alias
        aliased = true;
      }
    }

    if (cmd) {
      $("#history").append(
        `<span class="stdout">${aliased ? `${args[0]} is an alias of ` : ""}${
          cmd.info.usage
        }:<br />    ${
          cmd.info.description
        }<br /><br />    Aliases:<br />        ${cmd.info.aliases.join(
          "<br />        "
        )}</span><br />`
      );
    } else {
      $("#history").append(
        `<span class="stderr">help: '${args[0] || ''}': Command not found. Type 'help' to list available commands.</span><br />`
      );
    }
  } else {
    $("#history").append(
      `<span class="stdout">Jack Weatherford's Website, version 1.0.0.<br />Type 'help' to list available commands.<br />Type 'help [command]' to get information about a specific command.<br /><br />Available Commands:<br />    ${cmd_list.join(
        "<br />    "
      )}</span><br />`
    );
  }
}

export const info = {
  name: "help",
  usage: "help [command]",
  description:
    "Type 'help' to list available commands.<br />    Type 'help [command]' to get information about a specific command.",
  aliases: ["?", "man", "info", "cmds", "commands"],
};
