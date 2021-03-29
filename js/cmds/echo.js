export async function run(args) {
  // TODO: Replace `\n` with `<br />` when arg is between "" or '':
  // args = args.map((arg) => arg.replace(/\\n/g, "<br />"));

  $("#history").append(
    `<span class="stdout">${args
      .map((arg) => (arg.includes("<br />") ? arg : arg + " "))
      .join("")}</span><br />`
  );
}

export const info = {
  name: "echo",
  usage: "echo [arguments ...]",
  description:
    "Prints the arguments following 'echo'.<br />    Each argument must be separated by spaces and/or surrounded by single or double quotes.",
  aliases: ["out", "cout", "stdout"],
};
