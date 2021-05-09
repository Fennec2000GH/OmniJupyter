![logo](./omnijupyter.png)
# OmniJupyter
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
![electron](https://img.shields.io/badge/framework-electron-cornflowerblue?style=for-the-badge&logo=appveyor)
![Jina](https://img.shields.io/badge/API-Jina-darkmagenta?style=for-the-badge&logo=appveyor)
![CockroachDB](https://img.shields.io/badge/database-CockroachDB-darkturquoise?style=for-the-badge&logo=appveyor)

![python3](https://img.shields.io/badge/language-python3-yellow?style=plastic&logo=appveyor)
![JS/HTML/CSS](https://img.shields.io/badge/language-JS/HTML/CSS-orange?style=plastic&logo=appveyor)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## TOHacks 2021 solo project 
This lightweight code editor emulates Jupyter Notebook on a webpage but each cell can be customized to a programming language runtime independently. Functionality for direct in-browser execution of code is a work-in-progress at this time. Users may run to download a script of the exact code in the cell with the correct extension. 

There is also an Electron desktop app separate from the in-browser webpage application, although both share a fair amount of identical code. The desktop app is also under development.


## How to use command line script to generate dependency tree for code cells?
With many cells, some cells may have code that rely entirely on cells before hand to be executed first. A document, or rather cell, dependency tree could be constructed and visualized with Jina API to better organize code cells or to keep handy records for reference. Follow the steps below.

1) Locate the program `/src/website/doctree.py`.
2) In a terminal run an instruction with the following syntax: `python3 doctree.py head1 dep1-1 dep1-2 ... '|' head2 dep2-1 dep2-2 ...`
- head1 represents the topmost cell, and dep1-n represents an arbitrary cell with head1 as immediate parent
- similarly, head2 represents the second-highest head node such that it has at most 1 parent, and dep2-n is an arbitrary cell with head2 as immediate parent
- each head and dep mentioned are paths to the corresponding downloaded scripts to each cell
 
