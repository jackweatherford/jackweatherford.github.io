import { nodeFromPath } from "../util.js";
import { DirNode } from "../filenode.js";

export function run(args) {
  if (args.length) {
    for (var arg of args) {
      const node = nodeFromPath(arg);

      if (!node || node instanceof DirNode) {
        // If the Node doesn't exist or it isn't a File Node
        $("#history").append(
          `<span class="stderr">cat: Cannot display '${arg || ''}': No such file.</span><br />`
        );
      } else {
        var contents = node.contents;
        if (!node.tagOverride) {
          contents = contents.replace(/&/g, "&amp;");
          contents = contents.replace(/</g, "&lt;");
        }
        $("#history").append(`<span class="stdout">${contents}</span><br />`);
      }
    }
  }
}

export const info = {
  name: "cat",
  usage: "cat [filename ...]",
  description: "Concatenate and print files into standard output",
  aliases: ["less", "more", "view"],
};
