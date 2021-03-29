export async function run(args) {
  $("#history").empty();
}

export const info = {
  name: "clear",
  usage: "clear",
  description:
    "Clears output history and places the prompt at the top of the terminal.",
  aliases: ["cl"],
};
