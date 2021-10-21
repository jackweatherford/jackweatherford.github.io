// Node class to create a structured file tree
class Node {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }
}

export class DirNode extends Node {
  constructor(name, parent, redirect) {
    super(name, parent);
    this.children = {};
    this.redirect = redirect;
  }

  setChildren(children) {
    this.children = children;
  }

  newChild(child) {
    this.children[child.name] = child;
  }
}

export class FileNode extends Node {
  constructor(name, parent, contents) {
    super(name, parent);
    this.contents = contents;
  }

  setContents(contents) {
    this.contents = contents;
  }
}

// Node Objects for initial file state
export const root = new DirNode("~");
const about = new DirNode("About", root);
const contact = new DirNode("Contact", root);
const education = new DirNode("Education", root);
const projects = new DirNode("Projects", root);
const skills = new DirNode("Skills", root);

// Projects
const jackweatherford_github_io = new DirNode(
  "jackweatherford.github.io",
  projects,
  true
);
jackweatherford_github_io.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    jackweatherford_github_io,
    "The source code for this website.\nCan you find any easter eggs? ;D"
  ),
});

const jstrisbot = new DirNode("JstrisBot", projects, true);
jstrisbot.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    jstrisbot,
    "AI that plays Tetris through jstris.jezevec10.com"
  ),
});

const pythoninterpreter = new DirNode("PythonInterpreter", projects, true);
pythoninterpreter.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    pythoninterpreter,
    "A simple python interpreter written in C++ that mimics Python 2.7"
  ),
});

const shufflefileorder = new DirNode("shufflefileorder", projects, true);
shufflefileorder.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    shufflefileorder,
    "Randomize the order of files within a directory"
  ),
});

const textbouncer = new DirNode("TextBouncer", projects, true);
textbouncer.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    textbouncer,
    "Bounces specified text/image around a transparent screen"
  ),
});

// Set up children
root.setChildren({
  About: about,
  Contact: contact,
  Education: education,
  Projects: projects,
  Skills: skills,
  "README.txt": new FileNode(
    "README.txt",
    root,
    "Hello World :)\nWelcome to my website!\nClick on a quick-navigation tab above the terminal or...\nType 'help' to list available commands."
  ),
});

about.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    about,
    "Nice to meet you, my name's Jack.\nI'm a passionate/experienced software developer/tutor with a B.S. in Computer Science.\nI'm currently working as a full-time Journeyman Developer for buildlabs.io."
  ),
});

contact.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    contact,
    "Feel free to contact me using the following links with whatever's on your mind:\nE-Mail: jack.weatherford@gmail.com\nGitHub: https://github.com/jackweatherford\nLinkedIn: https://www.linkedin.com/in/jackweatherford"
  ),
});

education.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    education,
    "Education Info:\nI attended Sonoma State University (A California State University in Sonoma County) from August, 2016 to May, 2020.\nIn May of 2020, I graduated with a Bachelor's of Science in Computer Science, Magna Cum Laude."
  ),
});

projects.setChildren({
  "jackweatherford.github.io": jackweatherford_github_io,
  JstrisBot: jstrisbot,
  PythonInterpreter: pythoninterpreter,
  shufflefileorder: shufflefileorder,
  TextBouncer: textbouncer,
  "README.txt": new FileNode(
    "README.txt",
    projects,
    "Here's a list of some of my personal/professional coding projects.\nClick on a Project Name or...\nType 'cd <ProjectName>' to learn more about a project."
  ),
});

skills.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    skills,
    "A subset of my most refined technical skills in no particular order:\n- Python (Numpy, Pandas, Matplotlib, Requests, OpenCV, Selenium, Pywin32, Unittest, Discord.py)\n- JavaScript (Node, React, Express, jQuery, D3)\n- C++\n- Java\n- SQL (MySQL, PostgreSQL)\n- NoSQL (MongoDB)\n- AWS (RDS, S3)"
  ),
});
