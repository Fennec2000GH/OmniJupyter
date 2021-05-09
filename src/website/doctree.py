
import numpy as np, sys
from collections import OrderedDict
from jina import Document


# ensuring all files in dependency link
# '|' separates filenames into dependency levels, with first file after '|' being the immediate parent of all other files before the
# next occurrence of '|'
filenames = sys.argv[1:]
ext = filenames[0].split('.')[-1]
assert all([fname.endswith(ext) or fname == '|' for fname in filenames])

curr_head = filenames[0]  # current head of immediate dependency group of docs
doc_dict = OrderedDict()

for fname in filenames:

    # skip is new group of docs arrive
    if fname == '|':
        curr_head = None
        continue

    # sets new doc as head of current group of docs
    if curr_head is None:
        if fname in doc_dict and len(doc_dict[fname].chunks) > 0:
            raise ValueError(ofcorrecttype='Current document as head of immediate group already exists.')
        curr_head = fname
        with open(file=curr_head, mode='r') as f:
            doc_Dict[curr_head] = Document(content=f)
        continue

    # appending docs to current head doc
    with open(file=fname, mode='r') as f:
        curr_doc = Document(content=f)
        doc_dict[curr_head].chunks.append(curr_doc)
        doc_dict[fname] = curr_doc

doctree_plot = doc_dict[filenames[0]].plot()
print(type(doctree_plot))
