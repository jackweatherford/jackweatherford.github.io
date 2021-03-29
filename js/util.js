import { os } from "./index.js";
import { root, FileNode } from "./filenode.js";

// Import commands based on cmd_names
export async function loadCmds(cmd_names) {
  var cmds = {};
  var aliases = {};
  for (const name of cmd_names) {
    cmds[name] = await import(`./cmds/${name}.js`);
    cmds[name].info.aliases.forEach((alias) => {
      aliases[alias] = name;
    });
  }
  return { cmds, aliases };
}

export function updateCaret() {
  $("#caret").css({
    visibility:
      $("#caret").css("visibility") == "hidden" ? "visible" : "hidden",
  });
}

// Tokenize user input using regex
export function tokenize(input) {
  var toks = [];
  var group;
  var pattern = /('(.*?)'|"(.*?)"|(?<=\s|^)([^\s;]+))(\s*)(;*)/g;
  var tok = pattern.exec(input);
  if (!tok) {
    return {
      toks: toks,
      input: input.slice(input.indexOf(";") + 1),
    };
  }
  while (tok) {
    group = tok[4] || tok[3] || tok[2];
    toks.push(group);
    if (tok[6]) {
      input = input.slice(tok.index + tok[0].length);
      break;
    }
    tok = pattern.exec(input);
  }
  return {
    toks: toks,
    input: tok ? input : "",
  };
}

// Returns the Node Object that the given filepath points to
export function nodeFromPath(filepath) {
  var nodes = filepath.split("/");
  var cwd = os.cwd;

  if (nodes[0] == "") {
    return null;
  } else if (nodes[0] == "~") {
    cwd = root;
    nodes = nodes.slice(1);
  }

  for (var node of nodes) {
    if ((node == "") | (node == ".")) {
      continue;
    } else if (node == "..") {
      if (!cwd) {
        return null;
      }
      cwd = cwd.parent;
    } else {
      if (!cwd) {
        return null;
      } else if (cwd.children[node] instanceof FileNode) {
        return cwd.children[node];
      } else {
        cwd = cwd.children[node];
      }
    }
  }

  return cwd;
}

// Returns the filepath that points to the given Node Object
export function pathFromNode(node) {
  var path = "";

  while (node.parent != null) {
    path = `/${node.name}${path}`;
    node = node.parent;
  }

  return `~${path}`;
}
