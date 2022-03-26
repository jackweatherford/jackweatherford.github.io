import { os } from "../index.js";
import { nodeFromPath, pathFromNode } from "../util.js";
import { FileNode, root } from "../filenode.js";

export async function run(args) {
  if (args.length == 0) {
    os.cwd = root;
  } else if (args.length == 1) {
    const node = nodeFromPath(args[0]);

    if (!node || node instanceof FileNode) {
      // If the Node doesn't exist or it isn't a Directory Node
      $("#history").append(
        `<span class="stderr">cd: Cannot traverse '${
          args[0] || ""
        }': No such directory.</span><br />`
      );
      return;
    } else {
      os.cwd = node;
    }
  } else {
    $("#history").append(
      `<span class="stderr">cd: Too many arguments: '${args.join(
        ", "
      )}'</span><br />`
    );
    return;
  }

  $(".dir.current").text(` ${pathFromNode(os.cwd)} $ `);
}

export const info = {
  name: "cd",
  usage: "cd [directory]",
  description:
    "Changes the current working directory to the specified directory.<br />    If no directory is provided, returns to the Home (~) directory.",
  aliases: ["cdir", "changedir"],
};
