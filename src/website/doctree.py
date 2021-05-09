
import io, numpy as np, os, pickle, sys, warnings
from contextlib import redirect_stdout
from collections import OrderedDict
from jina import Document

# '|' separates filenames into dependency levels, with first file after '|' being the immediate parent of all other files before the
# next occurrence of '|'
filenames = sys.argv[1:]
assert all([os.path.exists(path=fname) or fname == '|' for fname in filenames])

curr_head = None  # current head of immediate dependency group of docs
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
            doc_dict[curr_head] = Document(content=f.read())
        continue

    # appending docs to current head doc
    with open(file=fname, mode='r') as f:
        curr_doc = Document(content=f.read())
        doc_dict[curr_head].chunks.append(curr_doc)
        doc_dict[fname] = curr_doc

with open(file='doctree.pkl', mode='wb') as f:
    pickle.dump(obj=doc_dict, file=f)

# str_io = io.StringIO()
# with redirect_stdout(new_target=str_io):
#     doc_dict[filenames[0]].plot()
# out = str_io.getvalue()

# print('-' * 100)
# print(out)

# with warnings.catch_warnings(record=True) as w:
#     warnings.simplefilter("always")
#     doc_dict[filenames[0]].plot()
#     print('-' * 100)
#     print(w)

doc_dict[filenames[0]].plot()
