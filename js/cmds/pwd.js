import { os } from "../index.js";

export async function run(args) {
  $("#history").append(`<span class="stdout">${os.cwd.name}</span><br />`);
}

export const info = {
  name: "pwd",
  usage: "pwd",
  description: "Prints the absolute filepath to the current working directory.",
  aliases: ["cwd", "where", "whereami"],
};
