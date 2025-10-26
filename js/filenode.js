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
  constructor(name, parent, contents, tagOverride) {
    super(name, parent);
    this.contents = contents;
    this.tagOverride = tagOverride;
  }

  setContents(contents) {
    this.contents = contents;
  }

  setTagOverride(tagOverride) {
    this.tagOverride = tagOverride;
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
const jackweatherfordGithubIo = new DirNode(
  "jackweatherford.github.io",
  projects,
  true
);
jackweatherfordGithubIo.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    jackweatherfordGithubIo,
    "An interactive website showcasing everything about me.\nIncludes a working terminal!\nExplore my resume, experience, skills, side projects, and future goals.\nWritten in HTML + CSS + JavaScript. (JQuery)"
  ),
});

const jstrisBot = new DirNode("JstrisBot", projects, true);
jstrisBot.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    jstrisBot,
    "AI that plays Tetris through <a href='https://jstris.jezevec10.com/' target='_blank'>https://jstris.jezevec10.com/</a>\nWritten in Python.",
    true
  ),
});

const pythonInterpreter = new DirNode("PythonInterpreter", projects, true);
pythonInterpreter.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    pythonInterpreter,
    "A simple Python interpreter that mimics Python 2.7.\nWritten in C++."
  ),
});

const reactTicTacToe = new DirNode("ReactTicTacToe", projects, true);
reactTicTacToe.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    reactTicTacToe,
    "My solution for React's 'Intro to React' Tutorial. <a href='https://reactjs.org/tutorial/tutorial.html' target='_blank'>https://reactjs.org/tutorial/tutorial.html</a>\nWritten in JavaScript (React) + CSS.",
    true
  ),
});

const spotifyFriendActivity = new DirNode(
  "spotify-friend-activity",
  projects,
  true
);
spotifyFriendActivity.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    spotifyFriendActivity,
    "Google Chrome Extension to view your friends' activity in Spotify's web player.\nWritten in JavaScript (React) + CSS (Sass)."
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
    "Nice to meet you, my name's Jack.\nI'm a passionate/experienced software developer/tutor with a B.S. in Computer Science.\nI'm currently working as a full-time Lead Developer for buildlabs.io."
  ),
});

contact.setChildren({
  "README.txt": new FileNode(
    "README.txt",
    contact,
    "Feel free to contact me using the following links with whatever's on your mind:\nE-Mail: <a href='mailto:jack.weatherford@gmail.com'>jack.weatherford@gmail.com</a>\nGitHub: <a href='https://github.com/jackweatherford' target='_blank'>https://github.com/jackweatherford</a>\nLinkedIn: <a href='https://www.linkedin.com/in/jackweatherford' target='_blank'>https://www.linkedin.com/in/jackweatherford</a>",
    true
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
  "jackweatherford.github.io": jackweatherfordGithubIo,
  JstrisBot: jstrisBot,
  PythonInterpreter: pythonInterpreter,
  ReactTicTacToe: reactTicTacToe,
  "spotify-friend-activity": spotifyFriendActivity,
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
    "A subset of my most refined technical skills in no particular order:\n- JavaScript (React.js, TypeScript, jQuery, Next.js, Redux.js, React Native, Vue.js)\n- CSS (SASS, Bootstrap)\n- HTML\n- Git\n- GraphQL\n- SQL (MySQL, PostgreSQL)\n- NoSQL (MongoDB)\n- Python (Numpy, Pandas, Matplotlib, Requests, OpenCV, Selenium, Pywin32, Unittest, Discord.py)\n- C++\n- Java\n- Unix\n- AWS (RDS, S3, Amplify)\n- Agile Methodologies\n- Teaching\n- Public Speaking\n- Leadership"
  ),
});
