import { os } from "../index.js";
import { DirNode, FileNode } from "../filenode.js";
import { nodeFromPath, pathFromNode } from "../util.js";

export async function run(args) {
  var content = "";
  var nodes = {};

  if (args.length == 1) {
    var node = nodeFromPath(args[0]);

    if (!node || node instanceof FileNode) {
      // If the Node doesn't exist or it isn't a Directory Node
      $("#history").append(
        `<span class="stderr">ls: Cannot traverse '${args[0] || ''}': No such directory.</span><br />`
      );
      return;
    }

    nodes = node.children;
  } else if (args.length == 0) {
    nodes = os.cwd.children;
  } else {
    $("#history").append(
      `<span class="stderr">ls: Too many arguments: '${args.join(
        ", "
      )}'</span><br />`
    );
    return;
  }

  Object.entries(nodes)
    .sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase()))
    .forEach((entry) => {
      const [name, node] = entry;
      content += `<a data-filepath="${pathFromNode(node)}"`;
      if (node instanceof DirNode) {
        content += ` class="dir"`;
        if (node.redirect) {
          content += ` href="https://github.com/jackweatherford/${name}" target="_blank"`;
        }
      } else {
        content += ` class="file"`;
      }
      content += `>${name}</a>    `;
    });

  $("#history").append(`<span class="stdout">${content}</span><br />`);

  $("a.dir").off("click");

  $("a.dir").on("click", function () {
    var e = jQuery.Event("keydown", { key: "Enter" });
    var prev_text = $(".stdin.current").text();
    $(".stdin.current").text(`cd ${this.dataset.filepath}; ls`);
    $("#input").focus();
    $("#input").trigger(e);
    $(".stdin.current").text(prev_text);
  });

  $("a.file").off("click");

  $("a.file").on("click", function () {
    var e = jQuery.Event("keydown", { key: "Enter" });
    var prev_text = $(".stdin.current").text();
    $(".stdin.current").text(`cat ${this.dataset.filepath}`);
    $("#input").focus();
    $("#input").trigger(e);
    $(".stdin.current").text(prev_text);
  });
}

export const info = {
  name: "ls",
  usage: "ls [directory]",
  description:
    "Lists the files and directories that exist in the specified directory.<br />    If no directory is provided, lists current working directory's content.",
  aliases: ["dir", "list"],
};
