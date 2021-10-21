import { root } from "./filenode.js";
import { loadCmds, updateCaret, tokenize, pathFromNode } from "./util.js";

/* Initializes the clock element
var date = new Date();
$("#date").html(date.toLocaleString().split(", ").join("<br />")); */

// Initializes the list of available cmds
export const cmd_list = ["cat", "cd", "clear", "echo", "help", "ls", "pwd"];

// Initializes operating system properties
export var os = {
  user: "guest",
  host: "jack",
  cwd: root,
};

export var cmds = {};
export var aliases = {};

// Loads commands + aliases
loadCmds(cmd_list).then((result) => {
  cmds = result.cmds;
  aliases = result.aliases;

  // Enters initial command: 'ls; cat README.txt'
  $(".stdin.current").text("ls; cat README.txt");
  $("#input").focus();
  $("#input").trigger(jQuery.Event("keydown", { key: "Enter" }));
});

var ctrl_down = false;
var text_highlighted = false;
var selected_button = null;

/* Updates clock every second
window.setInterval(function () {
  setTimeout(function () {
    date = new Date();
    $("#date").html(date.toLocaleString().split(", ").join("<br />"));
  }, 1000 - date.getMilliseconds());
}, 0);
*/

// Countdown
let dateFuture = new Date(2022, 9, 19, 22, 35, 0);
let days = 0;
let hours = 0;
let mins = 0;
let secs = 0;

// Call when everything has loaded
window.setInterval(function () {
  setTimeout(function () {
    // Grab current date
    let dateNow = new Date();
    // Calculate milliseconds between dates
    let amount = dateFuture.getTime() - dateNow.getTime();

    // If date is in the past
    if (amount < 0) {
      $("#countdown").html("Now!");
    }
    // Else if date is in the future
    else {
      let out = "";
      // Convert to seconds
      amount = Math.floor(amount / 1000);
      // Get days
      days = Math.floor(amount / 86400);
      amount = amount % 86400;
      // Get hours
      hours = Math.floor(amount / 3600);
      amount = amount % 3600;
      // Get minutes
      mins = Math.floor(amount / 60);
      amount = amount % 60;
      // Get seconds
      secs = Math.floor(amount);

      if (days != 0) {
        out += days + " day" + (days != 1 ? "s" : "") + ", ";
      }
      if (days != 0 || hours != 0) {
        out += hours + " hour" + (hours != 1 ? "s" : "") + ", ";
      }
      if (days != 0 || hours != 0 || mins != 0) {
        out += mins + " minute" + (mins != 1 ? "s" : "") + ", ";
      }
      out += secs + " seconds";
      $("#countdown").html(out);
    }
  }, 1000);
}, 0);

// Blinks caret every 0.5 seconds
var caret_blink = window.setInterval(updateCaret, 500);

// Listens for key presses in input box
$("#input").keydown(function (e) {
  const key = e.key;
  // Grabs current user input text
  var stdin = $(".stdin.current").text();

  var cmd;

  // TODO: Implement arrow key handlers.
  if (key === "Backspace" || key === "Delete") {
    $(".stdin.current").text(stdin.slice(0, -1));
  } else if (key === "Tab") {
    // TODO: Implement tab handler. (auto-complete)
  } else if (key === "Enter") {
    // Replaces `&` and `<` with `&amp` and `&lt` respectively - this avoids interpreting user input as HTML markup
    stdin = stdin.replace(/&/g, "&amp");
    stdin = stdin.replace(/</g, "&lt");

    $("#history").append(
      `<span class="user old">${os.user}@${
        os.host
      }</span><span class="dir old"> ${pathFromNode(
        os.cwd
      )} $ </span><span class="stdin old">${stdin}<br /></span>`
    );

    while (stdin.trim().length && stdin.trim() != ";") {
      const remaining = tokenize(stdin);
      const cmd_and_args = remaining.toks;
      stdin = remaining.input;
      if (!cmd_and_args.length) {
        continue;
      }
      const cmd_name = cmd_and_args[0].toLowerCase();
      cmd = cmds[cmd_name] || cmds[aliases[cmd_name]];
      const args = cmd_and_args.slice(1);

      // Executes the command
      if (cmd) {
        cmd.run(args);
      } else {
        $("#history").append(
          `<span class="stderr">'${cmd_and_args[0]}': Command not found. Type 'help' to list available commands.</span><br />`
        );
      }
    }

    if (cmd) {
      if (cmd.info.name != "clear") {
        $("#history").append("<br />");
      }
    } else {
      $("#history").append("<br />");
    }

    $(this).val("");
    $(".stdin.current").text("");

    // Scroll to input box - For when the prompt extends past the bottom of the terminal
    this.scrollIntoView();
    $("#terminal").scrollLeft(0);

    $("#tabs button").css({
      "border-bottom-color": "var(--user-color)",
      color: "var(--text-color)",
    });

    if (selected_button) {
      $(selected_button).prop("disabled", false);
    }
    selected_button = null;
  } else if (key.length === 1) {
    if (!ctrl_down) {
      this.scrollIntoView();
      $("#terminal").scrollLeft(0);

      $(".stdin.current").text(stdin + key);
    } else if (key == "v") {
      this.scrollIntoView();
      $("#terminal").scrollLeft(0);
    }
  }
});

$("#input").focusin(function () {
  if (!caret_blink) {
    caret_blink = window.setInterval(updateCaret, 500);
  }
});

$("#input").focusout(function () {
  text_highlighted = getSelection().toString() ? true : false;
  ctrl_down = false;
  if (caret_blink) {
    window.clearInterval(caret_blink);
    $("#caret").css({ visibility: "visible" });
    caret_blink = undefined;
  }
});

$("#input").bind("paste", function (e) {
  var copied_str = e.originalEvent.clipboardData.getData("text");
  var str_to_paste = "";
  for (var i = 0; i < copied_str.length; i++) {
    if (copied_str.charCodeAt(i) == 10) {
      str_to_paste += " ";
    } else if (copied_str.charCodeAt(i) != 13) {
      str_to_paste += copied_str[i];
    }
  }
  $(".stdin.current").text($(".stdin.current").text() + str_to_paste);
});

$("#tabs button").hover(
  function () {
    $(this).css({
      "border-bottom-color": "var(--bg-color)",
      color: "var(--dir-color)",
      cursor: "pointer",
    });
  },
  function () {
    if (selected_button != this) {
      $(this).css({
        "border-bottom-color": "var(--user-color)",
        color: "var(--text-color)",
      });
    }
  }
);

$("#tabs button").click(function () {
  var prev_selected = selected_button;
  var prev_text = $(".stdin.current").text();
  var e = jQuery.Event("keydown", { key: "Enter" });
  $(".stdin.current").text(`cd ~/${this.name}; ls; cat README.txt`);
  $("#input").focus();
  $("#input").trigger(e);
  $(".stdin.current").text(prev_text);

  $(this).css({
    "border-bottom-color": "var(--bg-color)",
    color: "var(--dir-color)",
    cursor: "default",
  });
  $(this).prop("disabled", true);
  if (prev_selected) {
    $(prev_selected).prop("disabled", false);
  }
  selected_button = this;
});

$(window).focus(function () {
  $("#input").focus();
});

$(window).keydown(function (e) {
  if (e.key === "Control") {
    ctrl_down = true;
  }

  if (text_highlighted && !ctrl_down) {
    text_highlighted = false;
    $("#input").focus();
    $("#input").trigger(e);
  }
});

$(window).keyup(function (e) {
  if (e.key === "Control") {
    ctrl_down = false;
  }
});

$(window).mouseup(function (e) {
  if (e.which === 1) {
    if (getSelection().toString()) {
      text_highlighted = true;
    } else {
      text_highlighted = false;
      $("#input").focus();
      ctrl_down = false;
    }
  }
});

$(window).mousedown(function (e) {
  if (e.which === 1) {
    if (getSelection().toString()) {
      text_highlighted = false;
      $("#input").focus();
      ctrl_down = false;
    } else {
      text_highlighted = true;
    }
  }
});
